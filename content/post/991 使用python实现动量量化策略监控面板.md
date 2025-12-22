

---
title: 使用python实现动量量化策略监控面板
date: '2025-12-22 10:00:00'
lastmod: '2025-12-22 10:00:00'
categories:
- 技术实践
tags:
- 动量
- 量化
- Python
- Streamlit
- AkShare
description: 基于 Python 的动量轮动量化策略监控面板，使用 AkShare 获取数据，Streamlit 可视化展示并提供回测示例。
featured_image: https://cdn.jsdelivr.net/gh/thinkmoon/pic@master/images/3d373cc29b5472532d4b9cf94d03be80.png
---

# 使用python实现动量量化策略监控面板

## 1. 什么是动量策略？

在金融市场中，动量效应（Momentum Effect）被誉为“金融界的牛顿第一定律”。它的核心逻辑是：**强者恒强**。

动量策略不关注公司的财务报表，也不关心基本面估值，它只看价格趋势。

它假设过去一段时间表现最好的资产，在未来的一段时间内大概率会继续表现良好；反之，过去表现最差的资产，未来大概率会继续下跌。这是一种**“追涨杀跌”**的策略，但不同于散户的情绪化操作，它是基于严格的数据回测和纪律执行的。


## 2. 标的选择：构建“微型全天候”组合

为了提高策略的稳健性，我们不建议只在单一股市内部寻找动量。在本次实践中，我们选取了五个**低相关性**的跨国、跨类别资产作为池子：

1. **创业板 ETF (159915)**：代表 A 股高弹性、科技成长风格。
2. **沪深 300 ETF (510300)**：代表 A 股大盘、价值蓝筹风格。
3. **纳指 100 ETF (513100)**：代表全球科技龙头，与 A 股周期错位。
4. **黄金 ETF (518880)**：经典的避险资产，在股市动荡时常有独立行情。
5. **货币 ETF (511880)**：作为“防御港湾”，当上述风险资产全部熄火时，用来保护本金。


## 3. 策略逻辑设计

我们设计的量化看板遵循以下双重逻辑：

* **相对动量（优中选优）**：计算这四个风险资产过去 $N$ 天（如 20 天）的涨幅，找出表现最强的那一个。
* **绝对动量（止损风控）**：如果表现最强的资产收益率依然为负（或者低于货币基金收益），说明市场整体环境极差，此时策略强制切换至 **货币 ETF** 进行空仓避险。


## 4. 技术栈实现

为了保证环境的纯净和运行的性能，我们推荐使用以下配置方案：

* **环境管理**：Conda (推荐 Python 3.11 版本)。
* **数据来源**：AkShare (免费开源的金融数据接口库)。
* **前端展示**：Streamlit (极速构建 Web 数据看板的利器)。
* **交互绘图**：Plotly (提供响应式的缩放图表)。

### 核心代码实现逻辑

创建环境

```bash
conda create -n quant_lab python=3.11 -c conda-forge -y
conda activate quant_lab
```

安装相关依赖

```bash
pip install akshare streamlit plotly pandas matplotlib
```

量化策略监控面板

```python
import streamlit as st
import akshare as ak
import pandas as pd
import datetime
import plotly.express as px

# 页面配置
st.set_page_config(page_title="全球资产动量轮动策略", layout="wide")

# ===========================
# 1. 策略配置与标的池
# ===========================
st.sidebar.header("⚙️ 策略参数设置")

# 标的池定义 (代码需根据实际ETF代码调整，这里选取了流动性较好的代表)
ASSETS = {
    "159915": "创业板ETF",   # A股成长/科技
    "510300": "沪深300ETF",  # A股蓝筹/大盘
    "513100": "纳指100ETF",  # 美股科技 (QDII)
    "518880": "黄金ETF",     # 避险/大宗商品
    "511880": "银华日利"     # 货币/现金管理 (避险港湾)
}

# 现金/避险资产的代码
CASH_ASSET_CODE = "511880"

# 参数设置
lookback_period = st.sidebar.number_input(
    "动量回顾周期 (天)", 
    min_value=5, 
    max_value=250, 
    value=20, 
    step=1,
    help="计算过去多少天的收益率作为动量指标。常用：20天(月频)、60天(季频)。"
)

top_n = 1  # 动量策略通常只持有第1名

st.title("🚀 全球资产动量轮动策略看板")
st.markdown(f"**策略逻辑**：计算过去 **{lookback_period}个交易日** 的涨幅。持有排名第一的资产。如果排名第一的资产收益率为负，则切换至货币ETF。")

# ===========================
# 2. 数据获取函数 (使用缓存加速)
# ===========================
@st.cache_data(ttl=3600)  # 缓存1小时，避免频繁请求
def get_market_data(assets_dict, period_days):
    df_list = []
    
    # 获取当前日期和推算的起始日期（多取一些数据以确保计算准确）
    end_date = datetime.datetime.now().strftime("%Y%m%d")
    start_date = (datetime.datetime.now() - datetime.timedelta(days=period_days*2 + 30)).strftime("%Y%m%d")

    progress_bar = st.progress(0)
    status_text = st.empty()
    
    total = len(assets_dict)
    count = 0

    for code, name in assets_dict.items():
        count += 1
        status_text.text(f"正在获取 {name} ({code}) 数据...")
        progress_bar.progress(count / total)
        
        try:
            # 使用 AkShare 获取 ETF 历史行情
            stock_data = ak.fund_etf_hist_em(symbol=code, period="daily", start_date=start_date, end_date=end_date)
            
            if stock_data.empty:
                continue

            # 整理数据
            stock_data['日期'] = pd.to_datetime(stock_data['日期'])
            stock_data = stock_data.sort_values('日期')
            
            # 获取最新价格和N天前价格
            if len(stock_data) >= period_days:
                latest_price = stock_data.iloc[-1]['收盘']
                latest_date = stock_data.iloc[-1]['日期'].strftime("%Y-%m-%d")
                
                # N天前的价格 (用于计算动量)
                # 注意：实际交易中要防止由于停牌等导致的天数不对，这里做简化处理
                prev_price = stock_data.iloc[-1 - period_days]['收盘']
                
                # 计算收益率 (动量)
                momentum = (latest_price - prev_price) / prev_price * 100
                
                df_list.append({
                    "代码": code,
                    "名称": name,
                    "最新日期": latest_date,
                    "当前价格": latest_price,
                    f"{period_days}日涨幅(%)": round(momentum, 2),
                    "历史数据": stock_data  # 存入历史数据用于画图
                })
        except Exception as e:
            st.error(f"获取 {name} 数据失败: {e}")
            
    status_text.empty()
    progress_bar.empty()
    
    return pd.DataFrame(df_list)

# ===========================
# 3. 核心逻辑与展示
# ===========================

period_days = lookback_period  # 别名补丁，防止变量名不统一报错

if st.button("🔄 刷新数据 / 运行策略", type="primary"):
    df = get_market_data(ASSETS, lookback_period)

    if not df.empty:
        # 1. 排名
        df = df.sort_values(by=f"{period_days}日涨幅(%)", ascending=False).reset_index(drop=True)
        
        # 2. 策略判定
        top_asset = df.iloc[0]
        top_name = top_asset['名称']
        top_momentum = top_asset[f"{period_days}日涨幅(%)"]
        
        # 货币ETF的信息
        cash_row = df[df['代码'] == CASH_ASSET_CODE]
        cash_name = "货币ETF"
        if not cash_row.empty:
            cash_name = cash_row.iloc[0]['名称']

        st.divider()
        
        # === 信号展示区 ===
        col1, col2 = st.columns([2, 1])
        
        with col1:
            st.subheader("📢 本期交易信号")
            
            # 逻辑判断：绝对动量检查
            # 如果第一名是货币ETF，或者第一名的涨幅 <= 0，则持有货币
            # 注意：如果货币ETF本身排第一，那自然买货币
            
            is_defensive = False
            final_target = top_name
            
            if top_momentum <= 0 and top_asset['代码'] != CASH_ASSET_CODE:
                is_defensive = True
                final_target = cash_name
                st.warning(f"⚠️ 警报：排名第一的 {top_name} 收益率为负 ({top_momentum}%)，触发绝对动量风控。")
                st.success(f"✅ **建议持仓：{final_target} ({CASH_ASSET_CODE})** [避险模式]")
            else:
                st.success(f"✅ **建议持仓：{final_target} ({top_asset['代码']})** [进攻模式]")
                st.info(f"理由：{top_name} 在过去 {lookback_period} 天表现最强，且趋势向上。")

        with col2:
            st.metric(label=f"当前最强 ({top_name}) 动量", value=f"{top_momentum}%")

        # === 排行榜表格 ===
        st.subheader("📊 资产动量排行榜")
        
        # 格式化显示，高亮前三名
        def highlight_top(s):
            is_max = s == s.max()
            return ['background-color: #d4edda' if v else '' for v in is_max]

        st.dataframe(
            df[["代码", "名称", "当前价格", f"{period_days}日涨幅(%)", "最新日期"]],
            use_container_width=True,
            hide_index=True
        )

        # === 可视化图表 ===
        st.subheader("📈 收益率走势对比 (归一化)")
        
        # 合并所有标的的历史数据进行绘图
        plot_df = pd.DataFrame()
        for index, row in df.iterrows():
            hist_data = row['历史数据']
            # 截取最近 N*2 天的数据画图
            display_days = lookback_period * 2
            subset = hist_data.tail(display_days).copy()
            # 归一化：让起点都变成 1
            start_price = subset.iloc[0]['收盘']
            subset['累计净值'] = subset['收盘'] / start_price
            subset['名称'] = row['名称']
            plot_df = pd.concat([plot_df, subset])

        fig = px.line(
            plot_df, 
            x='日期', 
            y='累计净值', 
            color='名称',
            title=f'过去 {lookback_period*2} 天各资产走势对比 (起点归一)',
            markers=False
        )
        st.plotly_chart(fig, use_container_width=True)

    else:
        st.error("未能获取数据，请检查网络或稍后再试。")

else:
    st.info("👈 请在左侧调整参数，并点击上方按钮开始分析。")

# 侧边栏说明
st.sidebar.markdown("---")
st.sidebar.markdown("""
### 💡 说明
1. **数据来源**：东方财富 (via AkShare)。
2. **纳指ETF**：因涉及QDII，数据可能比A股资产滞后一天。
3. **货币ETF**：作为风控锚点。当所有风险资产动量均小于0时，应切换至货币ETF。
""")
```

![3d373cc29b5472532d4b9cf94d03be80](https://cdn.jsdelivr.net/gh/thinkmoon/pic@master/images/3d373cc29b5472532d4b9cf94d03be80.png)

## 5. 结果回测

回测代码

```python
import akshare as ak
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import datetime

# ===========================
# 1. 回测配置
# ===========================
# 设置中文显示（防止绘图乱码）
plt.rcParams['font.sans-serif'] = ['SimHei'] 
plt.rcParams['axes.unicode_minus'] = False

ASSETS = {
    "159915": "创业板ETF",
    "510300": "沪深300ETF",
    "513100": "纳指100ETF",
    "518880": "黄金ETF",
    "511880": "银华日利"
}

START_DATE = "20200101"
END_DATE = datetime.datetime.now().strftime("%Y%m%d")
LOOKBACK = 20  # 动量窗口
REBALANCE_FREQ = 20  # 调仓频率（每20个交易日调一次仓）

def get_data(code, name):
    print(f"正在获取 {name} 历史数据...")
    df = ak.fund_etf_hist_em(symbol=code, period="daily", start_date=START_DATE, end_date=END_DATE)
    df = df[['日期', '收盘']]
    df.columns = ['date', name]
    df['date'] = pd.to_datetime(df['date'])
    return df.set_index('date')

# ===========================
# 2. 数据准备
# ===========================
# 合并所有标的价格数据
all_prices = []
for code, name in ASSETS.items():
    all_prices.append(get_data(code, name))

data = pd.concat(all_prices, axis=1).fillna(method='ffill').dropna()

# ===========================
# 3. 模拟回测逻辑
# ===========================
def run_backtest(df, lookback, freq):
    # 计算每日收益率
    returns = df.pct_change()
    
    # 策略净值，初始为1
    strategy_net_value = [1.0]
    # 基准净值（等权重持有）
    benchmark_net_value = [1.0]
    
    current_asset = None
    
    # 从lookback开始模拟，因为需要先计算动量
    for i in range(lookback, len(df)):
        # 判定是否到了调仓日
        if (i - lookback) % freq == 0:
            # 1. 计算过去lookback天的涨幅
            momentum = (df.iloc[i-1] - df.iloc[i-lookback]) / df.iloc[i-lookback]
            
            # 2. 选出最强标的
            top_asset = momentum.idxmax()
            top_value = momentum.max()
            
            # 3. 绝对动量过滤：如果最强标的涨幅<=0，则切换到货币ETF
            if top_value <= 0:
                current_asset = "银华日利"
            else:
                current_asset = top_asset
        
        # 计算当日策略收益
        daily_return = returns.iloc[i][current_asset]
        strategy_net_value.append(strategy_net_value[-1] * (1 + daily_return))
        
        # 计算基准收益（假设等权重持有所有标的）
        benchmark_return = returns.iloc[i].mean()
        benchmark_net_value.append(benchmark_net_value[-1] * (1 + benchmark_return))

    # 封装结果
    result_df = pd.DataFrame({
        '策略净值': strategy_net_value,
        '等权基准': benchmark_net_value
    }, index=df.index[lookback-1:])
    return result_df

# ===========================
# 4. 执行与展示
# ===========================
results = run_backtest(data, LOOKBACK, REBALANCE_FREQ)

# 计算统计指标
total_ret = (results['策略净值'].iloc[-1] - 1) * 100
annual_ret = ((results['策略净值'].iloc[-1])**(250/len(results)) - 1) * 100
# 计算最大回撤
rolling_max = results['策略净值'].cummax()
drawdown = (results['策略净值'] - rolling_max) / rolling_max
max_dd = drawdown.min() * 100

print(f"\n--- 回测报告 ---")
print(f"回测期间: {data.index[0].date()} 至 {data.index[-1].date()}")
print(f"累计收益: {total_ret:.2f}%")
print(f"年化收益: {annual_ret:.2f}%")
print(f"最大回撤: {max_dd:.2f}%")

# 绘图
plt.figure(figsize=(12, 6))
plt.plot(results['策略净值'], label='动量轮动策略', color='red', linewidth=2)
plt.plot(results['等权基准'], label='等权持有基准', color='gray', linestyle='--')
plt.title(f'动量轮动策略回测 (回看:{LOOKBACK}天, 调仓:{REBALANCE_FREQ}天)')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()
```

回测结果


![9d05ff365e3fa65e450e32c79c096e2a](https://cdn.jsdelivr.net/gh/thinkmoon/pic@master/images/9d05ff365e3fa65e450e32c79c096e2a.png)

![51fd0ca4ff62bd2a2660a4e2b70b02fe](https://cdn.jsdelivr.net/gh/thinkmoon/pic@master/images/51fd0ca4ff62bd2a2660a4e2b70b02fe.png)

## 6. 总结与展望

通过这个 Python 量化看板，我们可以实现数据驱动的决策，一眼看清当前市场的“领头羊”是谁，有效规避由于主观偏好导致的“死守亏损标的”。


> **免责声明**：本文内容仅供量化技术交流和编程学习，不构成任何投资建议。金融市场有风险，入市需谨慎。
