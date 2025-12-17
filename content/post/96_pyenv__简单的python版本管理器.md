---
title: pyenv——简单的python版本管理器
date: '2019-09-03 10:27:15'
lastmod: '2019-09-03 10:27:15'
categories:
- 学习笔记
tags:
- python
---


## 简单的python版本管理器: pyenv



> pyenv可以让你轻松的在各版本的python环境中切换自如，它是一个简单而又不引人注目并遵循UNIX传统的专用工具。



这个项目是从[rbenv](https://github.com/rbenv/rbenv)和[ruby-build](https://github.com/rbenv/ruby-build)fork而来, 并且在配合Python的情况下做了适当的修改.



![Terminal output example][1]





## pyenv能做什么？



* 让你在**用户基础**上改变全局Python版本.

* 支持为**每一个项目**设立一个Python版本.

* 允许您使用**环境变量**覆盖Python版本.

* 在**多个python环境**中搜索命令,这有助于在Python版本中进行测试 [tox](https://pypi.python.org/pypi/tox).





## 与pythonbrew和pythonz相比，pyenv不能做什么?



* **不依赖于Python本身。** pyenv是由纯shell脚本制作的。没有Python的引导问题。

* **不需要加载到你的shell中。**相反，pyenv的shim方法的工作原理是在`$ PATH`中添加一个目录。

* **不能管理virtualenv** 当然你可以自行创建virtualenv [virtualenv](https://pypi.python.org/pypi/virtualenv)或者使用[pyenv-virtualenv](https://github.com/pyenv/pyenv-virtualenv)去自动化构建



## 工作原理



在较高的层次上，pyenv使用shim拦截Python命令注入`PATH`的可执行文件, 确定哪个Python版本已由您的应用程序指定，并传递您的命令使用你想要的Python安装版本。



### 理解PATH(环境变量路径)



当你执行命令,如`python`或者`pip`, 你的操作系统会搜索目录列表以查找可执行文件的那个名字.此目录列表位于环境变量中称为`PATH`, 列表中的每个目录使用用冒号分隔.



![PATH.png][2]



`PATH`中的目录从左到右搜索，因此首先匹配在列表开头的目录中的可执行文件, 然后一次往右匹配。在这个例子中，首先搜索`/usr/local/sbin`目录，然后搜索`/usr/local/bin`，然后是`/usr/sbin`。



### 理解Shims(垫片)



pyenv的工作原理是在你的`PATH`前面插入一个shims目录，这样一来系统在搜索Python的时候第一个找到的就是pyenv管理的Python环境。这个插到最前面的路径就叫做垫片（shims）



    $(pyenv root)/shims:/usr/local/bin:/usr/bin:/bin



通过一个叫做为_rehashing_的进程, pyenv维护shims目录以匹配每个已安装版本的每个Python命令,比如`python`，`pip`等。



垫片是轻量级可执行文件，只是简单地传递命令到pyenv。所以只要安装了pyenv，当你运行时，比如说，`pip`，你的操作系统将执行以下操作：



* 在`PATH`中搜索名为`pip`的可执行文件

* 在`PATH`的开头找到名为`pip`的pyenv垫片

* 运行名为`pip`的垫片，然后将命令传递给属于pyenv的pip命令



### 选择Python版本



执行shims程序时，pyenv会确定要使用的Python版本,并按此以下资源顺序读取:



1. `PYENV_VERSION`环境变量（如果指定）. 你可以使用[`pyenv shell`](https://github.com/pyenv/pyenv/blob/master/COMMANDS.md#pyenv-shell) 去设置环境变量在你当前shell session.



2. 当前特定于应用程序的`.python-version`文件目录（如果有）. 您可以使用 [`pyenv local`](https://github.com/pyenv/pyenv/blob/master/COMMANDS.md#pyenv-local)修改当前目录`.python-version`文件.



3. 通过搜索每个上层目录,找到第一个`.python-version`文件（如果有的话），直到到达文件系统的根目录



4. 全局`$(pyenv root)/version`文件. 您可以使用[`pyenv global`](https://github.com/pyenv/pyenv/blob/master/COMMANDS.md#pyenv-global) 修改这个文件. 如果是该全局文件不存在，pyenv假设您要使用“系统”Python。(换句话说，如果pyenv不在您的PATH中，那么任何版本都会运行.)



**NOTE:** 您可以同时激活多个版本，甚至包括Python2或Python3的任何版本. 这允许平行使用Python2和Python3，并且需要像`tox`这样的工具. 例如，要设置你的首次使用的系统Python和Python3的路径（在这个例子中设置为2.7.9和3.4.2），但也可以在你的`PATH`使用Python 3.3.6,3.2和2.5，首先是`pyenv install`缺少的版本，然后设置`pyenv`全局3.3.6 3.2 2.5`.这时, 使用`pyenv which`应该能够找到每个可执行路径, 例如`pyenv which python2.5`（应该显示`$（pyenv root/versions/2.5 /bin/python2.5`) 或者`pyenv which python3.4`(应该显示系统Python3路径). 您还可以指定多个`.python-version`文件中的版本，由换行符或任何空格分隔。



### 定位Python的安装路径



一旦pyenv确定了您的应用程序具有哪个版本的Python, 它将命令传递给相应的Python.



每个Python版本都安装在自己的目录下

`$(pyenv root)/versions`.



例如，您可能安装了这些版本:



* `$(pyenv root)/versions/2.7.8/`

* `$(pyenv root)/versions/3.4.2/`

* `$(pyenv root)/versions/pypy-2.4.0/`



就pyenv而言，版本名称只是其中的目录名



`$(pyenv root)/versions`.



### 管理虚拟环境



有一个叫做[pyenv-virtualenv](https://github.com/pyenv/pyenv-virtualenv)的pyenv插件, 它有很多功能，可帮助pyenv用户管理virtualenv或Anaconda创建的虚拟环境。因为那些虚拟环境的`activate`脚本依赖于改变shell的`$ PATH`变量, 

它会去hook拦截pyenv的shim样式命令钩子.如果您有计划使用这些虚拟环境，我们建议您安装pyenv-virtualenv。





----





## 安装



如果您是macOS,推荐转至[installing with Homebrew](#homebrew-on-macos).





### 自动化安装器



访问以下项目:

https://github.com/pyenv/pyenv-installer





### 基于GitHub检出





这可以让你一直保持最新版本的pyenv, 并且fork上游分支的任何变化



1. **在哪里检出.**

   我们建议`$HOME/.pyenv` (但其实您可以安装在任何地方).



        $ git clone https://github.com/pyenv/pyenv.git ~/.pyenv





2. **Define environment variable `PYENV_ROOT`** to point to the path where

   pyenv repo is cloned and add `$PYENV_ROOT/bin` to your `$PATH` for access

   to the `pyenv` command-line utility.



    ```sh

    $ echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bash_profile

    $ echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bash_profile

    ```

    **Zsh note**: Modify your `~/.zshenv` file instead of `~/.bash_profile`.

    **Ubuntu and Fedora note**: Modify your `~/.bashrc` file instead of `~/.bash_profile`.

    **Proxy note**: If you use a proxy, export `http_proxy` and `HTTPS_PROXY` too.



3. **Add `pyenv init` to your shell** to enable shims and autocompletion.

   Please make sure `eval "$(pyenv init -)"` is placed toward the end of the shell

   configuration file since it manipulates `PATH` during the initialization.

    ```sh

    $ echo -e 'if command -v pyenv 1>/dev/null 2>&1; then\n  eval "$(pyenv init -)"\nfi' >> ~/.bash_profile

    ```

    - **Zsh note**: Modify your `~/.zshenv` file instead of `~/.bash_profile`.

    - **fish note**: Use `pyenv init - | source` instead of `eval (pyenv init -)`.

    - **Ubuntu and Fedora note**: Modify your `~/.bashrc` file instead of `~/.bash_profile`.



    **General warning**: There are some systems where the `BASH_ENV` variable is configured

    to point to `.bashrc`. On such systems you should almost certainly put the abovementioned line

    `eval "$(pyenv init -)"` into `.bash_profile`, and **not** into `.bashrc`. Otherwise you

    may observe strange behaviour, such as `pyenv` getting into an infinite loop.

    See [#264](https://github.com/pyenv/pyenv/issues/264) for details.



4. **Restart your shell so the path changes take effect.**

   You can now begin using pyenv.

    ```sh

    $ exec "$SHELL"

    ```



5. **Install Python build dependencies** before attempting to install a new Python version.  The

   [pyenv wiki](https://github.com/pyenv/pyenv/wiki) provides suggested installation packages

   and commands for various operating systems.



6. **Install Python versions into `$(pyenv root)/versions`.**

   For example, to download and install Python 2.7.8, run:

    ```sh

    $ pyenv install 2.7.8

    ```

   **NOTE:** If you need to pass configure option to build, please use

   ```CONFIGURE_OPTS``` environment variable.



   **NOTE:** If you want to use proxy to download, please use `http_proxy` and `https_proxy`

   environment variable.



   **NOTE:** If you are having trouble installing a python version,

   please visit the wiki page about

   [Common Build Problems](https://github.com/pyenv/pyenv/wiki/Common-build-problems)





#### Upgrading



If you've installed pyenv using the instructions above, you can

upgrade your installation at any time using git.



To upgrade to the latest development version of pyenv, use `git pull`:



```sh

$ cd $(pyenv root)

$ git pull

```



To upgrade to a specific release of pyenv, check out the corresponding tag:



```sh

$ cd $(pyenv root)

$ git fetch

$ git tag

v0.1.0

$ git checkout v0.1.0

```



### Uninstalling pyenv



The simplicity of pyenv makes it easy to temporarily disable it, or

uninstall from the system.



1. To **disable** pyenv managing your Python versions, simply remove the

  `pyenv init` line from your shell startup configuration. This will

  remove pyenv shims directory from PATH, and future invocations like

  `python` will execute the system Python version, as before pyenv.



  `pyenv` will still be accessible on the command line, but your Python

  apps won't be affected by version switching.



2. To completely **uninstall** pyenv, perform step (1) and then remove

   its root directory. This will **delete all Python versions** that were

   installed under `` $(pyenv root)/versions/ `` directory:

    ```sh

    rm -rf $(pyenv root)

    ```

   If you've installed pyenv using a package manager, as a final step

   perform the pyenv package removal. For instance, for Homebrew:



        brew uninstall pyenv



### Homebrew on macOS



You can also install pyenv using the [Homebrew](https://brew.sh)

package manager for macOS.



    $ brew update

    $ brew install pyenv





To upgrade pyenv in the future, use `upgrade` instead of `install`.



Then follow the rest of the post-installation steps under [Basic GitHub Checkout](https://github.com/pyenv/pyenv#basic-github-checkout) above, starting with #3 ("Add `pyenv init` to your shell to enable shims and autocompletion").



### Advanced Configuration



Skip this section unless you must know what every line in your shell

profile is doing.



`pyenv init` is the only command that crosses the line of loading

extra commands into your shell. Coming from rvm, some of you might be

opposed to this idea. Here's what `pyenv init` actually does:



1. **Sets up your shims path.** This is the only requirement for pyenv to

   function properly. You can do this by hand by prepending

   `$(pyenv root)/shims` to your `$PATH`.



2. **Installs autocompletion.** This is entirely optional but pretty

   useful. Sourcing `$(pyenv root)/completions/pyenv.bash` will set that

   up. There is also a `$(pyenv root)/completions/pyenv.zsh` for Zsh

   users.



3. **Rehashes shims.** From time to time you'll need to rebuild your

   shim files. Doing this on init makes sure everything is up to

   date. You can always run `pyenv rehash` manually.



4. **Installs the sh dispatcher.** This bit is also optional, but allows

   pyenv and plugins to change variables in your current shell, making

   commands like `pyenv shell` possible. The sh dispatcher doesn't do

   anything crazy like override `cd` or hack your shell prompt, but if

   for some reason you need `pyenv` to be a real script rather than a

   shell function, you can safely skip it.



To see exactly what happens under the hood for yourself, run `pyenv init -`.





### Uninstalling Python Versions



As time goes on, you will accumulate Python versions in your

`$(pyenv root)/versions` directory.



To remove old Python versions, `pyenv uninstall` command to automate

the removal process.



Alternatively, simply `rm -rf` the directory of the version you want

to remove. You can find the directory of a particular Python version

with the `pyenv prefix` command, e.g. `pyenv prefix 2.6.8`.





----





## Command Reference



See [COMMANDS.md](COMMANDS.md).





----



## Environment variables



You can affect how pyenv operates with the following settings:



name | default | description

-----|---------|------------

`PYENV_VERSION` | | Specifies the Python version to be used.<br>Also see [`pyenv shell`](https://github.com/pyenv/pyenv/blob/master/COMMANDS.md#pyenv-shell)

`PYENV_ROOT` | `~/.pyenv` | Defines the directory under which Python versions and shims reside.<br>Also see `pyenv root`

`PYENV_DEBUG` | | Outputs debug information.<br>Also as: `pyenv --debug <subcommand>`

`PYENV_HOOK_PATH` | [_see wiki_][hooks] | Colon-separated list of paths searched for pyenv hooks.

`PYENV_DIR` | `$PWD` | Directory to start searching for `.python-version` files.

`PYTHON_BUILD_ARIA2_OPTS` | | Used to pass additional parameters to [`aria2`](https://aria2.github.io/).<br>if `aria2c` binary is available on PATH, pyenv use `aria2c` instead of `curl` or `wget` to download the Python Source code. If you have an unstable internet connection, you can use this variable to instruct `aria2` to accelerate the download.<br>In most cases, you will only need to use `-x 10 -k 1M` as value to `PYTHON_BUILD_ARIA2_OPTS` environment variable







## Development



The pyenv source code is [hosted on

GitHub](https://github.com/pyenv/pyenv).  It's clean, modular,

and easy to understand, even if you're not a shell hacker.



Tests are executed using [Bats](https://github.com/sstephenson/bats):



    $ bats test

    $ bats/test/<file>.bats



Please feel free to submit pull requests and file bugs on the [issue

tracker](https://github.com/pyenv/pyenv/issues).





  [pyenv-virtualenv]: https://github.com/pyenv/pyenv-virtualenv#readme

  [hooks]: https://github.com/pyenv/pyenv/wiki/Authoring-plugins#pyenv-hooks



### Version History



See [CHANGELOG.md](CHANGELOG.md).



### License



[The MIT License](LICENSE)





  [1]: https://blog.cdn.thinkmoon.cn/blog/typecho/2019-09-03T02:26:51.png

  [2]: https://www.thinkmoon.cn/usr/uploads/2019/01/1698659685.png