---
title: MFC课程设计以及对xml文件的操作
date: '2020-02-18 18:36:35'
modified: '2020-02-18 18:36:35'
category: 教程分享
tags:
- MFC
---

废话不说，进入正题，`为了简便请调整项目属性为使用多字节字符集`

> tinyxml文件下载地址，（操作xml文件的）

http://sourceforge.net/projects/tinyxml/

## 一些函数功能

```javascript
ValueStr     //返回元素名称
SetValue     //设置元素名称
Parent     //返回父节点对象

FirstChild    //返回第一个子节点
LastChild     //返回最后一个子节点
IterateChildren   //返回下一个子节点

InsertEndChild   //在最后一个子节点后插入子节点
InsertBeforeChild   //在指定的子节点前插入子节点
InsertAfterChild   //在指定的子节点后插入子节点
ReplaceChild    //替换指定的子节点
RemoveChild    //删除指定的子节点
Clear     //删除所有的子节点

PreviousSibling   //返回同级中前一个节点
NextSibling    //返回同级中后一个节点

NextSiblingElement   //返回同级中后一个元素
FirstChildElement   //返回第一个子元素节点
Attribute     //返回元素中的属性值
QueryValueAttribute //返回元素中的属性值
SetAttribute    //设置元素中的属性值
FirstAttribute   //返回元素中第一个属性对象
LastAttribute    //返回元素中最后一个属性对象
RemoveAttribute   //删除元素中指定的属性对象
```

## tinyxml的添加

首先，将下载的文件解压复制到原项目目录，
然后，在解决方案中头文件添加现有项，添加进去。



## 接下来，在stdafx.h中包含两个头文件。


## mfc中xml文件的使用


- 第一步：建立对话框，添加CString变量（与编辑框关联起来).



- 第二步，（信息录入）添加按钮处理消息（双击按钮即可），利用UpdataeData（）更新数据，将数据录入xml文件。

```javascript
TiXmlDocument *pDoc = new TiXmlDocument();//文件指针
	const char *FileName = "res\\Number.xml";//文件名
	if(!pDoc->LoadFile(FileName))
	{
		UpdateData(TRUE);
		TiXmlElement *RootElement = NULL;//根节点
		TiXmlElement *PersonElement = NULL;//子节点
 
		TiXmlDeclaration *pTd = new TiXmlDeclaration("1.0", "gb2312", "yes" );
		pDoc->LinkEndChild(pTd);
 
		RootElement = new TiXmlElement("账号数据");
		pDoc->LinkEndChild(RootElement);
         }
         else{
                RootElement = pDoc->RootElement();
              }
 
		PersonElement = new TiXmlElement("用户");
		RootElement->LinkEndChild(PersonElement);
 
		TiXmlElement *NameElement = new TiXmlElement("账号");
		PersonElement->LinkEndChild(NameElement);
		TiXmlText *Number = new TiXmlText([要存的数据]);//存的数据可为CString类型
		NameElement->LinkEndChild(Number);
 
		TiXmlElement *PassWordElement = new TiXmlElement("密码");
		PersonElement->LinkEndChild(PassWordElement);
		TiXmlText *PassWord = new TiXmlText([要存的数据]);//存的数据可为CString类型
		PassWordElement->LinkEndChild(PassWord);
                
                //你有几项就弄几段上面的代码，本例为两项数据
                pDoc->SaveFile(FileName);
```

- 第三步，（信息显示）先添加list control 控件，选择report（报表）属性，同时添加变量m_ctllist1选择control类型（默认）。

然后在OnInitDialog(void)函数中添加如下代码

```javascript
DWORD dwStyle = m_ctllist1.GetExtendedStyle();                    //添加列表框的网格线！！！
 
	dwStyle |= LVS_EX_FULLROWSELECT;            
	dwStyle |= LVS_EX_GRIDLINES;                
	m_ctllist1.SetExtendedStyle(dwStyle);
	//list control 的初始化
	m_ctllist1.InsertColumn(0,"车牌",LVCFMT_CENTER,80); 
	m_ctllist1.InsertColumn(1,"进入时间",LVCFMT_CENTER,120);
	m_ctllist1.InsertColumn(2,"停车时间",LVCFMT_CENTER,120); 
	m_ctllist1.InsertColumn(3,"应缴费用",LVCFMT_CENTER,100);
	m_ctllist1.InsertColumn(4,"备注",LVCFMT_CENTER,220);
```

数值为长度，如未发现此函数，请在类向导中虚函数添加该函数。运行效果如下

然后添加刷新按钮事件处理程序

```javascript
TiXmlDocument * myDocument = new TiXmlDocument(); 
	if (!myDocument->LoadFile("res\\Number.xml"))
	{
		return ;
	}
	TiXmlElement *RootElement = myDocument->RootElement(); 
 
	TiXmlElement *FirstElement = RootElement->FirstChildElement();
 
	//循环遍历
	for (int i=0;FirstElement;i++)
	{
		TiXmlElement *NameElement = FirstElement->FirstChildElement();
		m_ctllist1.InsertItem(i,NameElement->GetText());//设置列表框第0行第0列数据
 
		//显示进车时间
		TiXmlElement *DateElement = NameElement->NextSiblingElement();
		const char *temp = DateElement-><pre name="code" class="html">GetText()
;m_ctllist1.SetItemText(i,1,temp);//设置列表框第0行第1列数据FirstElement = FirstElement->NextSiblingElement();}
```

- 第四步，（信息查找及修改）添加查找对话框，编辑框添加变量，本例为m_Number 。查找代码如下

```javascript
const char *FileNmae = "res\\Number.xml";
	TiXmlDocument *pDoc = new TiXmlDocument();
	if (pDoc->LoadFile(FileNmae))
	{
		TiXmlElement *RootElement = pDoc->RootElement();
		TiXmlElement *SonElement = RootElement->FirstChildElement();
		TiXmlElement *NumberElement = NULL;
		TiXmlElement *passWordElement = NULL;
		while (SonElement)
		{
			NumberElement = SonElement->FirstChildElement();
			if (NumberElement->GetText() == m_Number)//查找成功判断之后
			{
 
			}
			SonElement=SonElement->NextSiblingElement();
		}
信息查找修改代码如下，本例为查找用户名为m_Number修改密码为m_PassWord.两个变量都为编辑框CString类型
const char *FileNmae = "res\\Number.xml";
	TiXmlDocument *pDoc = new TiXmlDocument();
	if (pDoc->LoadFile(FileNmae))
	{
		TiXmlElement *RootElement = pDoc->RootElement();
		TiXmlElement *SonElement = RootElement->FirstChildElement();
		TiXmlElement *NumberElement = NULL;
		TiXmlElement *passWordElement = NULL;
		while (SonElement)
		{
			NumberElement = SonElement->FirstChildElement();
			if (NumberElement->GetText() == m_Number)
			{
				if (IDYES == MessageBox("该账号已存在，继续操作将覆盖","是否继续？",MB_YESNO|MB_ICONWARNING))
				{
					passWordElement = NumberElement->NextSiblingElement();
					TiXmlNode *PassWord = passWordElement->FirstChild();
					PassWord->SetValue(m_PassWord);
					pDoc->SaveFile(FileNmae);
				    MessageBox("密码修改成功,下次登录生效");
				}
					goto end;
			}
			SonElement=SonElement->NextSiblingElement();
		}
           }
```
- 第五步，信息删除，本例为查找账号名m_Number对该用户进行删除
```javascript
const char *FileName = "res\\Number.xml";
	 TiXmlDocument *pDoc = new TiXmlDocument();
	 if (!pDoc->LoadFile(FileName))
	 {
		 MessageBox("Number.xml文件损坏","加载失败",MB_OK | MB_ICONWARNING);
		 return ;
	 }
	 else
	 {
		 TiXmlElement *RootElement = pDoc->RootElement();
		 TiXmlElement *PersonElement = RootElement->FirstChildElement();
		 TiXmlElement *NumberElement = PersonElement->FirstChildElement();
		 TiXmlElement *PassWordElement = NumberElement->NextSiblingElement();
		 while (PersonElement)
		 {
			 NumberElement = PersonElement->FirstChildElement();
			 if (NumberElement->GetText() ==  m_Number)
			 {
				 RootElement->RemoveChild(PersonElement);
				 MessageBox("删除成功");
				 break;
			 }
			 else
			 {
				  PersonElement = PersonElement->NextSiblingElement();//节点后移
			 }
			
		 }
		 pDoc->SaveFile(FileName);
          }
```
## 结语
至于统计什么的，就是查找与显示的变异。