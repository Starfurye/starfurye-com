---
title: Cookbook For Unix/Linux
date: 2020-05-25 22:25:23
---

{% note info %}
本菜谱已按照字典序排序。
{% endnote %}

## 树莓派openwrt校园网拨号配置

首先将openwrt刷进sd卡，然后插入树莓派。等待30秒，再搜索wifi网络，找到openwrt并连接。

打开浏览器，输入`192.168.1.1`，输入默认的用户名和密码：

```text
root
password
```

选择网络下的接口（openwrt有三种不同的主题，这个按钮的位置不同）：

![接口](https://i.loli.net/2020/08/16/pWmEjtZOHdk2vRn.png)

然后选择新建接口，按如下内容填写：

![WAN](https://i.loli.net/2020/08/16/S92RYvrnQPlxApC.png)

填写宽带用户名、密码，如果运营商有要求还要填写服务名：

![PPPoE](https://i.loli.net/2020/08/16/ewTDhUg9fsZIiyq.png)

修改LAN接口，确保选中桥接，然后去掉物理接口下的eth0，保留无线接口：

![LAN](https://i.loli.net/2020/08/16/LBw8PrWT2Ey617I.png)

接下来修改SSID和密码，选中网络下的无线：

![wifi](https://i.loli.net/2020/08/16/gHMtTfVCwG8sFUv.png)

在接口配置下的基本设置中修改SSID，在无线安全下修改密码：

![ssid](https://i.loli.net/2020/08/16/SFKpMGtwJfnWymo.png)

![password](https://i.loli.net/2020/08/16/lE1MoFTrSyBwqjX.png)

## sftp传输文件


在Windows端我们一般使用Filezilla来传输文件，而在Linux可以直接使用sftp：


```shell
sftp [-46aCfpqrv] [-B buffer_size] [-b batchfile] [-c cipher] [-D sftp_server_path] [-F ssh_config] [-i identity_file]
          [-J destination] [-l limit] [-o ssh_option] [-P port] [-R num_requests] [-S program] [-s subsystem | sftp_server]
          destination
```

常用的操作：


首先建立ssh链接：


```shell
sftp username@dst_ip
# sftp root@192.168.1.100
```

输入密码后会出现提示符：`sftp>`


1. 从当前主机目录`ldir`**上传**文件到远程主机目录`rdir`：

    ```shell
    sftp> put [ldir] [rdir]
    ```
    
2. 从远程主机目录`rdir`**下载**文件到当前主机目录`ldir`：

    ```shell
    sftp> get [rdir] [ldir]
    ```
    

文件传输顺序始终为左->右。


在sftp中可以对远程主机使用这些命令：


* `bye`,`exit`和`quit`：退出sftp。

* 常用一般命令`cd`,`chmod`,`df`,`help`,`ls`,`mkdir`,`pwd`,`rename`,`rm`,`rmdir`。


以下命令以`l`开头，表示对**本地**服务器的操作：`lcd`,`lls`,`lmkdir`,`lpwd`,`lumask`。

`!`开头表示执行**本地**命令。




## ssh免密码登录远端机器


服务端：

1. 安装openssh-server;

2. 在要登录用户的home文件夹下创建`.ssh`文件夹;


客户端：

1. 安装ssh-keygen和ssh-copy-id（可选);



2. 创建公钥-私钥对，密码passphrase可以不输入：

```shell
ssh-keygen -t rsa -f .ssh/id_rsa -C "[username]@[hostname]"
```

ssh-keygen的常用参数：

`-t`: 密钥类型,可选dsa,ecdsa,ed25519,rsa；

`-f`: 密钥目录位置, 默认为当前用户home路径下的.ssh隐藏目录, 也就是`~/.ssh/`, 同时默认密钥文件名以`id_rsa`开头. 如果是root用户, 则在`/root/.ssh/id_rsa`, 若为其他用户, 则在`/home/username/.ssh/id_rsa`；

`-C`: 指定此密钥的备注信息, 需要配置多个免密登录时, 建议携带；

`-N`: 指定此密钥对的密码, 如果指定此参数, 则命令执行过程中就不会出现交互确认密码的信息了。



3. 用`ssh-copy-id`把公钥发送给服务端,ssh-copy-id命令连接远程服务器时的默认端口是22, 当然可以指定文件、远程主机的IP、用户和端口:

```shell
ssh-copy-id -i .ssh/id_rsa.pub [remote_username]@[remote_ip/hostname]
```

输入密码后，公钥会自动拷贝到服务端的`~/.ssh/authorized_keys`，再次登录就不需要输入密码了。



4. 也可以用scp传输公钥：

```shell
scp id_rsa.pub [remote_username]@[remote_ip/hostname]:/home/[remote_username]/.ssh
```

然后登录服务端，将公钥加入到`~/.ssh/authorized_keys`里：

```shell
cat id_rsa.pub >> authorized_keys
```



## wget下载网站服务器下某个目录的所有文件


由于众所周知的原因，国内访问一些国外的博客速度很慢甚至无法访问，这时我们就会使用某些工具。比如我有段时间在看[lazyfoo](http://lazyfoo.net/tutorials/SDL/)的SDL教程，这个网页不使用工具访问时会一闪一闪的导致无法正常观看，但我又不想一直挂着工具，就需要把目录下的全部教程包括源代码下载下来，这时就要用到强力的wget：

```shell
wget -r -c -np -nH -R index.html http://lazyfoo.net/tutorials/SDL/ 
```

`-r`：包括子目录下的文件
`-c`：断点续传
`-np`：
`-nH`：
`-R`：拒绝下载某个文件
