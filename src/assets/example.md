废话少说，直接解题。

## 2019-nCoV

签到题，不解释

![ncov.png](https://i.loli.net/2020/03/09/JXjbDFt1iyRNWZf.png)

## 简单的misc

附件内容，图片压缩包。  
binwalk图片 抽一个压缩包出来，解压是一个点划线组成的字符串

![morse.png](https://i.loli.net/2020/03/09/p714VOaHR9ukD8e.png)

猜测摩斯电码，在线解一下

![decode.png](https://i.loli.net/2020/03/09/feSmtwn8DNu7aHW.png)

`EPIDEMICSITUATIONOFUNIVERSITYWAR`

作为解压密码解一下压缩包，出来一个文本文件，base64编码，解一下就出来flag了

![b64decode.png](https://i.loli.net/2020/03/09/nbiFHIDYcoj7gPv.png)

## 隐藏的信息

下载附件，打开是一个二维码和一个压缩包，

二维码反色且缺少定位点，直接反相然后补上定位点发现被坑了。

![二维码.jpg](https://i.loli.net/2020/03/09/LKWiTP6pQeHsNbd.jpg)

![qrcode.png](https://i.loli.net/2020/03/09/Wy4u9ibojPKx8hN.png)

这张图片里其实还有信息，当然之后才会用到，直接strings扫图片（当然是原图）

![strings.png](https://i.loli.net/2020/03/09/CXafJWnu84wGAmK.png)

提示需要base64得到flag。（好像这个点有点狗，受到广大师傅的嘲讽。

然后看压缩包，发现是个伪加密，解压出来是个音频。  
音频的隐写就那几种（因为除了这几种我也不会了  
查看频谱，发现开头结尾有东西，仔细听像拨号音，放大看看发现确实是[双音多频(DTML)](https://zh.wikipedia.org/wiki/%E5%8F%8C%E9%9F%B3%E5%A4%9A%E9%A2%91)。  
这里你找工具或者手动读都可以，最终结果为

![start.png](https://i.loli.net/2020/03/09/yISwscHNn7dvJrj.png)

![end.png](https://i.loli.net/2020/03/09/ba19p5RnVqjg3hT.png)

![code](https://i.loli.net/2020/03/09/HdtVxcP3N4oqA9M.png)

`187485618521`

然后再回头看看那个base64，就发现，直接把这个base64，然后再尝试几下，就是flag了

![b64.png](https://i.loli.net/2020/03/09/v53tDAYGJuRrgpa.png)

## ez_mem&usb

呐呐，又是内存取证，再来玩一次吧。  
附件是一个pcap流量包，提取出一个压缩包后，解压，发现是个vmem文件，就是内存dump喽。  
起手上 `volatility`，扫进程发现没啥可疑的，就只有一个cmd。

![imageinfo.png](https://i.loli.net/2020/03/09/14Xk78FleYNsHcd.png)
![cmd.png](https://i.loli.net/2020/03/09/PLfzAgI1SrpOJ6e.png)

扫文件直接发现 `flag.img` ，显然是有用的，提取出来

![flag.img.png](https://i.loli.net/2020/03/09/cfJxSWROFMzvqKT.png)

挂载，发现是个嵌套了好多层的文件夹，直接展开，发现有个 `usbdata.zip` ，还有密码。  
再回头看看cmd，扫一下cmd历史

![cmdscan.png](https://i.loli.net/2020/03/09/viInQ7sN5gWbE2x.png)

密码：`weak_auth_top100`  
密码Get，解压，是个文本文件，内容就是提取的usb数据，直接上脚本。

![usbdata.png](https://i.loli.net/2020/03/09/7OXtDAqg5ydviaf.png)

```python
mappings = { 0x04:"A",  0x05:"B",  0x06:"C", 0x07:"D", 0x08:"E", 0x09:"F", 0x0A:"G",  0x0B:"H", 0x0C:"I",  0x0D:"J", 0x0E:"K", 0x0F:"L", 0x10:"M", 0x11:"N",0x12:"O",  0x13:"P", 0x14:"Q", 0x15:"R", 0x16:"S", 0x17:"T", 0x18:"U",0x19:"V", 0x1A:"W", 0x1B:"X", 0x1C:"Y", 0x1D:"Z", 0x1E:"1", 0x1F:"2", 0x20:"3", 0x21:"4", 0x22:"5",  0x23:"6", 0x24:"7", 0x25:"8", 0x26:"9", 0x27:"0", 0x28:"\n", 0x2a:"[DEL]",  0X2B:"    ", 0x2C:" ",  0x2D:"-", 0x2E:"=", 0x2F:"[",  0x30:"]",  0x31:"\\", 0x32:"~", 0x33:";",  0x34:"'", 0x36:",",  0x37:"." }
nums = []
keys = open('usbdata.txt')
for line in keys:
    if line[0]!='0' or line[1]!='0' or line[3]!='0' or line[4]!='0' or line[9]!='0' or line[10]!='0' or line[12]!='0' or line[13]!='0' or line[15]!='0' or line[16]!='0' or line[18]!='0' or line[19]!='0' or line[21]!='0' or line[22]!='0':
         continue
    nums.append(int(line[6:8],16))
keys.close()
output = ""
for n in nums:
    if n == 0 :
        continue
    if n in mappings:
        output += mappings[n]
    else:
        output += '[unknown]'
print 'output :\n' + output
```

跑一下，结果出来了

## 武汉加油（这题不会

这个题感谢re爷爷

动态调试，修改判断位，然后就自己打印flag了，好神奇吖（亿脸懵逼

![ylmb.jpg](https://i.loli.net/2020/03/09/NIOydjEXtCgb8uv.jpg)
