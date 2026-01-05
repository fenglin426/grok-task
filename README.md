## 马斯克都爱用的Grok定时任务，治好了我的信息焦虑

原创 AI沃茨 [卡尔的AI沃茨](javascript:void(0);) *2026年1月5日 22:57* *浙江*



信息焦虑晚期的我又来折腾信息流了！

过去一年我基本属于上一个坑刚填上，又给自己挖一新坑。折腾过AI浏览器，RSS+AI去重，Deep Research，Claude Code Skills，AI投毒等，

结论很简单，方法越复杂自动化程度越高越累。最近我又发现一个新方法，轻量到离谱，不需要任何编程知识。

**定时从X上一批大佬账号过去24小时更新的帖子里定点筛选出高赞高互动，同样的思路还可以获取全网Nano Banana Pro的百赞提示语帖子，还可以在Manus和元宝上定时用，相当完美的解法。**



![Image](https://mmbiz.qpic.cn/mmbiz_png/YEhakvKZjXn2xsEl1c2lg1Ov0Mh7JxGN0OT3dKyCoLvz2Bcw37CToRKibiaQSicBnUtrAl1Q0ibsJtCZpVkydUDMdg/640?wx_fmt=png&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1#imgIndex=0)

怎么发现的呢？

每次新产品出来，我都要先收集几十个case，除了用OpenAI Deep Research基本上就是Grok。

毕竟给马斯克充钱了，对话次数不用回来，总感觉亏了。我一开始也按常见思路去问，**“帮我收集 10 个 Nano Banana Pro 最火的帖子，带提示语的。”**



![Image](https://mmbiz.qpic.cn/mmbiz_jpg/YEhakvKZjXn2xsEl1c2lg1Ov0Mh7JxGNoibTTPsmkQc1iaQg0cAxLFJQpAgfcxyfeatIm8ETjle7nW15HCwVXbBQ/640?wx_fmt=jpeg&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1#imgIndex=1)

抓回来的东西很真实，但点赞数一看就不对劲，明显不是最火的那批。内容也很散没有重点。你说它没用吧，它也有用。你说它够用吧，它就差点意思

后来我刷到**@****ttmouse - 豆爸****的**Grok用法，在提示语里明确指定时间范围，热度指标和输出格式，



![Image](https://mmbiz.qpic.cn/mmbiz_png/YEhakvKZjXn2xsEl1c2lg1Ov0Mh7JxGN0A99D443I58YN1C5aeZaSp3bYqQfDqerfVVqo45bkxuGSIEK6gOrQg/640?wx_fmt=png&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1#imgIndex=2)

读起来像是请一助理先把市场摸了一遍，等我起床后就收到一份小抄了。

⚽

你现在是“Nano Banana Pro 每日热帖监控机器人”。  

每次用户说“执行 Nano Banana Pro 每日热帖监控”或直接给你这个提示词时，

请严格按照以下步骤和格式输出：

1. 1.搜索最近 24 小时（从现在往前推 24h）内 X（Twitter）平台所有包含“Nano Banana Pro”或“Gemini Nano Banana”等关键词的帖子。  
2. 2.筛选条件：  

  \- 点赞数 ≥ 30（优先高赞）

  \- 浏览量尽量 ≥ 1 万（如果当天整体数据低，可适当放宽但要标注）

  \- 必须是原创帖或明显与 Nano Banana Pro 提示词/技巧/作品相关的帖子

1. 3.按点赞数从高到低排序，取真实的前 20 条（如果不足 20 条，就给出全部并说明“今日仅找到 X 条高互动内容”）。  
2. 4.输出格式严格如下：

【Nano Banana Pro 24小时热帖速报】  
统计时间：XXXX年XX月XX日 XX:XX（UTC+8）前24小时  
今日最高赞：XXXX 赞｜今日最高浏览：XX万+  
（这里加一句你自己的简短观察，例如“今天建筑/自拍/视频提示最火爆”或“官方放出新功能，社区炸了”等，控制在20字以内）

@用户名  一句话描述（20-30字，突出提示词技巧、风格、用途）  
点赞 XXXX，浏览 X万+  
https://x.com/用户名/status/帖子的ID

（依次列出 Top 20，用空行分隔，每一个帖子用代码块包裹，方便复制）

\5. 所有链接必须是真实的 http://x.com 链接，ID 正确。  
\6. 如果当天确实没什么高互动内容，老实写“今日24小时内暂无突破1万浏览的高互动 Nano Banana Pro 帖子，社区比较平静”。  
\7. 不要编造数据、用户名、链接，一切基于真实搜索结果。

这个提示语可以被拆解成不同的形态，换成vibe coding的，veo3.1的都可以。

如果不想手动改，让Grok原汤化原食也是可以的。

先让Grok搜索技术名词，把中日英的常见写法都列出来，再用最近一周高赞的现象去反推社区在讨论什么，再提炼成监控关键词。这样得到的提示语会更贴着社区真实用法走，不会跑偏。



筛选条件这一趴是最重要的，删掉就会退化成我一开始用的提示语，有明确限定才能让Grok像SQL做精准筛选。



![Image](https://mmbiz.qpic.cn/mmbiz_png/YEhakvKZjXn2xsEl1c2lg1Ov0Mh7JxGNNXXiaLZlaclpfuHgiaIOSuicpTbocmES4lEx5ibcMuwW8CONEVCbGaibmIQ/640?wx_fmt=png&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1#imgIndex=3)

Grok的优势很直接，实时性强，很多时候比我手动刷更快更稳。但很多人会卡在新号关注大号的冷启动上，用一两个月都没看到什么有用的信息。

用这种方式搜一段时间，会顺便收罗出一批高质量创作者，相当于一箭三四五六七雕了。

不过到这里还只是加深单个主题的信息获取深度和去重能力。问题是我们一天会接触很多主题，AI一会儿发新模型，一会儿出新名词，一会儿又冒出一个新玩法。如果每个主题都手动触发一次，信息焦虑很快就会变成触发焦虑，刷完又刷，问完又问。

所以我盯上了Grok的Task，也就是定时任务。

**想象一下，你把上面提示语换个形态，把信息输入维度从关键词切换成一组大佬账号，再把它塞进 Tasks，设定每天早晚各跑一次。Grok 就会按时跑完，把结果推给你。推送形式可以是浏览器通知，也可以是邮件，你还可以在结果上继续追问。**

先把所有想获取内容的X账号都加到一个list里面，也可以先用我这个 

x.com/i/lists/1695376776867062037



![Image](https://mmbiz.qpic.cn/mmbiz_png/YEhakvKZjXn2xsEl1c2lg1Ov0Mh7JxGNxgvH7Buw1iaX7t4Vic6GX8yYeUYeYKF22K4AQyNCD8wpybV7AXWq7qkQ/640?wx_fmt=png&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1#imgIndex=4)

然后在🔗grok.com/tasks上新建一个定时任务。



![Image](https://mmbiz.qpic.cn/mmbiz_png/YEhakvKZjXn2xsEl1c2lg1Ov0Mh7JxGNG7nWyJCcDxhGBpIZuAS6bGLpDo8ibibxzqp5NyXd6WB9soBHJCjCK85A/640?wx_fmt=png&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1#imgIndex=5)

提示语是基于**@****ttmouse - 豆爸**的基础上修改的

[角色]

List账号每日热点内容筛选机器人

[任务目标]

1. 1.搜索最近 24 小时（从现在往前推 24h）内 X（Twitter）平台List指定用户ID 的帖子。 
2. 2.筛选条件：  
3. 3.按点赞数从高到低排序，取真实的前 20 条（如果不足 20 条，就给出全部并说明“今日仅找到 X 条高互动内容”）。  

输出格式严格如下：

1. 4.统计x.com/i/lists/1695376776867062037的账号

【AI INFO 24小时热帖速报】  

统计时间：XXXX年XX月XX日 XX:XX（UTC+8）前24小时  

今日最高赞：XXXX 赞｜今日最高浏览：XX万+  

（这里加一句你自己的简短观察，例如“今天建筑/自拍/视频提示最火爆”或“官方放出新功能，社区炸了”等，控制在20字以内）

@用户名  一句话描述（20-30字，突出提示词技巧、风格、用途）  

点赞 XXXX，浏览 X万+  

https://x.com/用户名/status/帖子的ID

（依次列出 Top 20，用空行分隔）

1. 5.所有链接必须是真实 http://x.com 链接，ID 正确。  
2. 6.如果当天确实没什么高互动内容，老实写“今日24小时内暂无突破1万浏览的高互动帖子，社区比较平静”。  
3. 7.不要编造数据、用户名、链接，一切必须基于真实搜索结果。

以前我刷信息的时候会反复去确认有没有新东西，确认有没有漏掉，确认是不是又出了爆点。

有了task之后，我试着把手机里大部分通知都关了，去相信早上那一次总结和晚上那一次总结。

开始还是会不安，觉得会漏掉很多信息，但实际上并没有。中间确实可能会漏掉几个点，可换来的好处是我有了更长一段消化和创作的时间。这个时间不是碎片化的刷屏，是可以连续思考的时间。

接下来我就要来个大的了，

元宝和Manus也能定时任务！

元宝还不限数量，但有点小问题，信源不一定会只从公众号和视频号里拿，所以时间刻度会有点慢。



![Image](https://mmbiz.qpic.cn/mmbiz_png/YEhakvKZjXn2xsEl1c2lg1Ov0Mh7JxGNic70GicRVFDHCngWN2xqG3AHetjzic1PibO2EY0YjOhYohYN0e3yVic61zg/640?wx_fmt=png&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1#imgIndex=6)

再往外推一步，就轮到Manus这种更像自动化系统，或者说简易的多Agent上场了。



![Image](https://mmbiz.qpic.cn/mmbiz_png/YEhakvKZjXn2xsEl1c2lg1Ov0Mh7JxGNeG8kUCekU2WBSRmVToMmPNtaCw1vMNNUO88ZBOiaXdMicN6A0Bo7BNkQ/640?wx_fmt=png&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1#imgIndex=7)

Manus有定时功能就相当于其他的Agent都有了，比方说可以在Manus里登陆Genspark就可以每天定时抓电影资源了。

这个就给自己再挖一个坑，下一篇再结合Manus最新的一些好玩的更新一起说。

现在回看一下我这波折腾，

信息焦虑的根源并不是我错过了多少信息，

而是我不知道错过了什么。

不确定那条没看到的更新是不是关键，

不确定那条没刷到的热帖是不是爆点，

所以我不停刷新。

定时化信息流的价值，

就是把这份不确定性折叠掉一部分，

让我知道今天的变化大概长什么样。

以前我把链接丢收藏夹，丢备忘录，丢各种todo list，最后会崩塌成信息坟场。

现在我更愿意让定时日报成为笔记本身，

它带着时间戳，像是每天切下来的薄片。

哪天想写Nano Banana Pro了，

就翻翻最近七天日报，

选题和案例就已经在这了。