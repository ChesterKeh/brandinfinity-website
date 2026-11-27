/*
  I18N — English / Thai / Simplified Chinese.
  Any element with data-i18n="key" is translated; English comes from the page itself.
  Keys are either short ids ("nav.work") or the English text itself (for things built from projects.js).
  Missing translations fall back to English, so it is safe to add new text without translating it.
  Please have a native speaker review before using with clients.
*/
window.I18N = (() => {
  const DICT = {
    th: {
      "nav.work": "ผลงาน", "nav.products": "ผลิตภัณฑ์", "nav.partners": "พาร์ทเนอร์", "nav.services": "บริการ", "nav.about": "ทำไมต้องเรา", "nav.contact": "ติดต่อ",
      "cta.start": "เริ่มโปรเจกต์", "cta.reel": "ดูโชว์รีล", "cta.follow": "ติดตามบน LinkedIn", "cta.deck": "ดาวน์โหลดโปรไฟล์บริษัท (PDF)",
      "hero.eyebrow": "พาร์ทเนอร์ชิประหว่างแบรนด์ × IP บันเทิง",
      "hero.pre": "เราเชื่อมแบรนด์ของคุณเข้ากับนักเล่าเรื่องชั้นนำในวงการ", "hero.c1": "", "hero.c2": "", "hero.and": "และ", "hero.post": "",
      "kw.film": "ภาพยนตร์", "kw.licensing": "ลิขสิทธิ์", "kw.gaming": "เกม", "kw.streaming": "สตรีมมิ่ง",
      "hero.now": "กำลังฉาย", "hero.trusted": "ได้รับความไว้วางใจจากสตูดิโอชั้นนำ", "ticker": "IP ที่เราพาแบรนด์เข้าไปร่วมงาน",
      "work.k": "ผลงานเด่น", "work.t": "ผลงานของเรา", "work.hint": "ปัดหรือใช้ลูกศร", "work.all": "โปรเจกต์ทั้งหมด", "work.showall": "ดูโปรเจกต์ทั้งหมด", "work.fewer": "แสดงน้อยลง ↑",
      "prod.k": "สินค้าและการร่วมโปรโมต", "prod.t": "ผลิตภัณฑ์และกิจกรรม", "prod.a": "สินค้ารุ่นพิเศษ ของที่ระลึก และการผสานแบรนด์ในเกม",
      "partners.k": "พาร์ทเนอร์", "partners.t": "แบรนด์ที่เราเคยร่วมงานด้วย",
      "quotes.k": "จากใจพาร์ทเนอร์", "quotes.t": "เสียงจากพาร์ทเนอร์",
      "band.k": "ยกระดับแบรนด์ของคุณ", "band.t1": "กำลังจะเปิดตัวสินค้าใหม่?", "band.t2": "ให้แบรนด์ของคุณเป็นส่วนหนึ่งของเรื่องราว",
      "band.p": "บอกเราเกี่ยวกับแบรนด์และช่วงเวลาของคุณ แล้วเราจะเสนอ IP รูปแบบพาร์ทเนอร์ชิป และไอเดียแคมเปญที่เหมาะสม",
      "slate.k": "เร็วๆ นี้", "slate.p": "ผลงานที่กำลังจะออกฉายซึ่งยังเปิดรับพาร์ทเนอร์แบรนด์ รายชื่อทั้งหมดเปิดเผยภายใต้ NDA", "slate.cta": "ขอดูรายชื่อ →",
      "svc.k": "เบื้องหลัง", "svc.t": "บริการ", "svc.a": "ตั้งแต่ไอเดียแรกจนถึงวันเปิดตัว",
      "svc.0": "เข้าถึง IP ระดับโลก", "svc.1": "ที่ปรึกษาด้านแบรนด์", "svc.2": "ลิขสิทธิ์และการเจรจา", "svc.3": "แคมเปญและกิจกรรม",
      "svx.0h": "เข้าถึงสตูดิโอได้โดยตรง",
      "svx.0p": "เข้าถึงผู้อยู่เบื้องหลัง IP ภาพยนตร์ เกม และสตรีมมิ่งระดับโลกโดยตรง ผ่านความสัมพันธ์ที่สร้างมากว่า 15 ปี",
      "svx.1h": "ค้นหาเรื่องราวที่ใช่สำหรับแบรนด์ของคุณ",
      "svx.1p": "เราจับคู่แบรนด์ กลุ่มเป้าหมาย และปฏิทินของคุณกับประเภท เรื่อง และจังหวะเวลาที่เหมาะสม ก่อนที่คุณจะลงงบประมาณ",
      "svx.2h": "ดีลที่ได้ผลสำหรับธุรกิจของคุณ",
      "svx.2p": "เราเจรจากับเจ้าของลิขสิทธิ์ในทุกหมวดสินค้า และวางโครงสร้างดีลตามเป้าหมายของคุณ",
      "svx.3h": "ตั้งแต่หนังเปิดตัวจนถึงชั้นวางสินค้า",
      "svx.3p": "ดูแลครบวงจรทุกจุดสัมผัส ตั้งแต่โซเชียลและพีอาร์ ไปจนถึงค้าปลีก สินค้าที่ระลึก และการผสานแบรนด์ในเกม",
      "svx.ex": "ดูผลงานจริง",
      "Studio & rights-holder alliances": "พันธมิตรสตูดิโอและเจ้าของลิขสิทธิ์",
      "Premiere sponsorship & events": "สปอนเซอร์รอบปฐมทัศน์และอีเวนต์",
      "Partnership planning": "วางแผนพาร์ทเนอร์ชิป",
      "Entertainment strategy": "กลยุทธ์ด้านบันเทิง",
      "Genre & IP fit": "ความเหมาะสมของประเภทและ IP",
      "Calendar & budget planning": "วางแผนปฏิทินและงบประมาณ",
      "Licensed: fee-based": "แบบมีค่าลิขสิทธิ์",
      "License-free: media support": "แบบไม่มีค่าลิขสิทธิ์: สนับสนุนสื่อ",
      "Hybrid: a mix of both": "แบบผสม",
      "Promotions & sales mechanics": "โปรโมชันและกลไกการขาย",
      "Social, PR & launch events": "โซเชียล พีอาร์ และอีเวนต์เปิดตัว",
      "Retail, e-commerce & merch": "ค้าปลีก อีคอมเมิร์ซ และสินค้าที่ระลึก",
      "In-film & in-game integration": "การผสานแบรนด์ในภาพยนตร์และเกม",
      "steps.k": "ขั้นตอนการทำงาน",
      "steps.1t": "บรีฟ", "steps.1p": "บอกเราเกี่ยวกับแบรนด์ ตลาด งบประมาณ และช่วงเวลาเปิดตัว",
      "steps.2t": "จับคู่ IP", "steps.2p": "เราคัดเลือกภาพยนตร์ เกม และซีรีส์ที่ตรงกับกลุ่มเป้าหมายและปฏิทินของคุณ",
      "steps.3t": "ลิขสิทธิ์และการอนุมัติ", "steps.3p": "เราเจรจาดีลและดูแลการอนุมัติจากสตูดิโอสำหรับทุกชิ้นงาน",
      "steps.4t": "เปิดตัว", "steps.4p": "แคมเปญ สินค้า และการวางจำหน่าย ดูแลครบวงจร",
      "why.k": "ทำไมต้องเลือกเรา", "why.t1": "เราเชี่ยวชาญด้าน", "why.t2": "ป๊อปคัลเจอร์",
      "why.exp": "ประสบการณ์", "why.partners": "พาร์ทเนอร์แบรนด์", "why.genres": "ประเภท", "why.region": "ขอบเขต",
      "why.expv": "15+ ปี", "why.genresv": "ภาพยนตร์ · เกม · สตรีมมิ่ง", "why.regionv": "ระดับภูมิภาคและระดับโลก",
      "contact.k": "อยากให้แบรนด์ของคุณเป็นที่จดจำ?", "contact.t1": "แบรนด์ของคุณ", "contact.t2": "เร็วๆ นี้", "contact.t3": "บนจอใกล้บ้านคุณ",
      "contact.lead": "ติดต่อทีมงานเพื่อพูดคุยว่าเราจะนำเรื่องราวของแบรนด์คุณเข้าสู่โลกบันเทิงได้อย่างไร",
      "f.address": "ที่อยู่", "f.follow": "ติดตาม", "f.deck": "โปรไฟล์", "f.deckshort": "โปรไฟล์บริษัท (PDF)", "f.top": "กลับขึ้นด้านบน ↑",
      "form.name": "ชื่อ", "form.company": "บริษัท", "form.email": "อีเมล", "form.budget": "งบประมาณ", "form.timing": "ช่วงเปิดตัว",
      "form.select": "เลือก", "form.unsure": "ยังไม่แน่ใจ", "form.t1": "ภายใน 3 เดือน", "form.t2": "3–6 เดือน", "form.t3": "6–12 เดือน", "form.t4": "12 เดือนขึ้นไป",
      "form.ip": "IP ที่สนใจ", "form.ipph": "เช่น ภาพยนตร์ เกม หรือคาแรกเตอร์ (ไม่บังคับ)", "form.interest": "สนใจด้าน", "form.brief": "รายละเอียด", "form.send": "ส่งข้อความ →",
      "reel.close": "ปิด ✕",
      "All": "ทั้งหมด", "Next project": "โปรเจกต์ถัดไป", "Your brand": "แบรนด์ของคุณ", "the next big IP": "IP ใหญ่เรื่องถัดไป", "Start a project →": "เริ่มโปรเจกต์ →",
      "Film & Entertainment": "ภาพยนตร์และบันเทิง", "Gaming": "เกม", "Consumer Tech": "เทคโนโลยีผู้บริโภค", "Lifestyle & Travel": "ไลฟ์สไตล์และท่องเที่ยว",
      "Automotive & Energy": "ยานยนต์และพลังงาน", "FMCG: Food, Beverage & Personal Care": "สินค้าอุปโภคบริโภค: อาหาร เครื่องดื่ม และของใช้ส่วนตัว",
      "Ongoing": "ต่อเนื่อง", "Tentpole film": "ภาพยนตร์ฟอร์มยักษ์", "Superhero & animated summer releases": "ภาพยนตร์ซูเปอร์ฮีโร่และแอนิเมชันช่วงซัมเมอร์",
      "Game launch": "เกมเปิดตัวใหม่", "AAA & mobile titles with in-game integration": "เกม AAA และเกมมือถือ พร้อมการผสานแบรนด์ในเกม",
      "Streaming series": "ซีรีส์สตรีมมิ่ง", "Returning seasons on global platforms": "ซีซันใหม่บนแพลตฟอร์มระดับโลก",
      "Classic brands": "แบรนด์คลาสสิก", "Toys, games & characters for licensing": "ของเล่น เกม และคาแรกเตอร์สำหรับลิขสิทธิ์",
      "Brand": "แบรนด์", "Property": "IP", "Discipline": "ประเภท", "Scope": "ขอบเขตงาน", "Results": "ผลลัพธ์",
      "Campaign results available on request.": "ขอข้อมูลผลลัพธ์ของแคมเปญได้", "Ask us →": "สอบถามเรา →",
      "Have a brief?": "มีบรีฟแล้ว?", "Start a project like this": "เริ่มโปรเจกต์แบบนี้",
      "Please add your name, a valid email and a short brief.": "กรุณากรอกชื่อ อีเมลที่ถูกต้อง และรายละเอียดสั้นๆ",
      "Sending…": "กำลังส่ง…", "Thanks! The team will be in touch soon.": "ขอบคุณ! ทีมงานจะติดต่อกลับเร็วๆ นี้",
      "Something went wrong. Please email connect@brandinfinity.sg.": "เกิดข้อผิดพลาด กรุณาส่งอีเมลมาที่ connect@brandinfinity.sg",
      "Opens your email app with the message ready.": "จะเปิดแอปอีเมลพร้อมข้อความที่เตรียมไว้",
      "Your email app should open now. If not, write to connect@brandinfinity.sg.": "แอปอีเมลของคุณกำลังเปิด หากไม่เปิด กรุณาส่งอีเมลมาที่ connect@brandinfinity.sg"
    },
    zh: {
      "nav.work": "作品", "nav.products": "产品", "nav.partners": "合作伙伴", "nav.services": "服务", "nav.about": "为何选择我们", "nav.contact": "联系我们",
      "cta.start": "开启合作", "cta.reel": "观看作品集锦", "cta.follow": "在 LinkedIn 关注我们", "cta.deck": "下载公司介绍 (PDF)",
      "hero.eyebrow": "品牌 × 娱乐 IP 合作",
      "hero.pre": "我们将您的品牌与", "hero.c1": "、", "hero.c2": "、", "hero.and": "和", "hero.post": "领域的顶尖内容创作者连接起来。",
      "kw.film": "电影", "kw.licensing": "授权", "kw.gaming": "游戏", "kw.streaming": "流媒体",
      "hero.now": "正在播放", "hero.trusted": "深受各大电影公司信赖", "ticker": "我们为品牌对接的 IP",
      "work.k": "精选作品", "work.t": "我们的作品", "work.hint": "滑动或使用箭头", "work.all": "全部项目", "work.showall": "查看全部项目", "work.fewer": "收起 ↑",
      "prod.k": "周边与联名", "prod.t": "产品与活动", "prod.a": "限量版、周边商品与游戏内植入",
      "partners.k": "合作伙伴", "partners.t": "与我们合作过的品牌",
      "quotes.k": "合作伙伴心声", "quotes.t": "合作伙伴怎么说",
      "band.k": "提升您的品牌", "band.t1": "有新品即将上市？", "band.t2": "让品牌融入故事。",
      "band.p": "告诉我们您的品牌和时间安排，我们将为您推荐合适的 IP、合作模式和活动创意。",
      "slate.k": "即将上映", "slate.p": "仍开放品牌合作的即将上映作品。完整片单需签署保密协议后提供。", "slate.cta": "索取片单 →",
      "svc.k": "幕后", "svc.t": "服务", "svc.a": "从创意构思到上市当天",
      "svc.0": "对接全球 IP", "svc.1": "品牌咨询", "svc.2": "授权与谈判", "svc.3": "营销活动执行",
      "svx.0h": "直接对接各大片方。",
      "svx.0p": "凭借 15 年积累的合作关系，直接对接全球电影、游戏和流媒体 IP 的决策者。",
      "svx.1h": "找到最适合您品牌的故事。",
      "svx.1p": "在投入预算之前，我们将您的品牌、受众和档期与合适的类型、作品和时机进行匹配。",
      "svx.2h": "为您的业务量身定制合作方案。",
      "svx.2p": "我们与版权方就各品类进行谈判，并围绕您的目标设计合作结构。",
      "svx.3h": "从上市大片到终端货架。",
      "svx.3p": "覆盖每个触点的一站式执行，从社交媒体和公关到零售、周边商品及游戏内植入。",
      "svx.ex": "查看案例",
      "Studio & rights-holder alliances": "片方与版权方合作",
      "Premiere sponsorship & events": "首映赞助与活动",
      "Partnership planning": "合作规划",
      "Entertainment strategy": "娱乐营销策略",
      "Genre & IP fit": "类型与 IP 匹配",
      "Calendar & budget planning": "档期与预算规划",
      "Licensed: fee-based": "授权模式：付费",
      "License-free: media support": "免授权费：媒体支持",
      "Hybrid: a mix of both": "混合模式",
      "Promotions & sales mechanics": "促销与销售机制",
      "Social, PR & launch events": "社交、公关与发布活动",
      "Retail, e-commerce & merch": "零售、电商与周边",
      "In-film & in-game integration": "影视与游戏内植入",
      "steps.k": "合作流程",
      "steps.1t": "需求简报", "steps.1p": "告诉我们您的品牌、市场、预算和上市时间。",
      "steps.2t": "IP 匹配", "steps.2p": "我们为您筛选契合受众和档期的电影、游戏和剧集。",
      "steps.3t": "版权与审批", "steps.3p": "我们负责谈判，并管理每项素材的片方审批。",
      "steps.4t": "上市", "steps.4p": "营销活动、产品与零售推广，一站式交付。",
      "why.k": "为何选择我们", "why.t1": "我们专注于", "why.t2": "流行文化。",
      "why.exp": "经验", "why.partners": "品牌伙伴", "why.genres": "领域", "why.region": "覆盖范围",
      "why.expv": "15 年以上", "why.genresv": "电影 · 游戏 · 流媒体", "why.regionv": "区域及全球",
      "contact.k": "想让您的品牌脱颖而出？", "contact.t1": "您的品牌，", "contact.t2": "即将登陆", "contact.t3": "您身边的银幕。",
      "contact.lead": "联系我们的团队，探讨如何将您的品牌故事融入娱乐内容。",
      "f.address": "地址", "f.follow": "关注", "f.deck": "公司介绍", "f.deckshort": "公司介绍 (PDF)", "f.top": "返回顶部 ↑",
      "form.name": "姓名", "form.company": "公司", "form.email": "邮箱", "form.budget": "预算", "form.timing": "上市时间",
      "form.select": "请选择", "form.unsure": "尚未确定", "form.t1": "3 个月内", "form.t2": "3–6 个月", "form.t3": "6–12 个月", "form.t4": "12 个月以上",
      "form.ip": "心仪 IP", "form.ipph": "例如电影、游戏或角色（选填）", "form.interest": "感兴趣的领域", "form.brief": "需求简介", "form.send": "发送咨询 →",
      "reel.close": "关闭 ✕",
      "All": "全部", "Next project": "下一个项目", "Your brand": "您的品牌", "the next big IP": "下一个大 IP", "Start a project →": "开启合作 →",
      "Film & Entertainment": "影视娱乐", "Gaming": "游戏", "Consumer Tech": "消费科技", "Lifestyle & Travel": "生活方式与旅行",
      "Automotive & Energy": "汽车与能源", "FMCG: Food, Beverage & Personal Care": "快消品：食品、饮料与个人护理",
      "Ongoing": "长期开放", "Tentpole film": "院线大片", "Superhero & animated summer releases": "暑期超级英雄与动画大片",
      "Game launch": "游戏上线", "AAA & mobile titles with in-game integration": "3A 与手游大作，支持游戏内植入",
      "Streaming series": "流媒体剧集", "Returning seasons on global platforms": "全球平台的续季剧集",
      "Classic brands": "经典品牌", "Toys, games & characters for licensing": "可授权的玩具、游戏与角色",
      "Brand": "品牌", "Property": "IP", "Discipline": "类别", "Scope": "合作范围", "Results": "成果",
      "Campaign results available on request.": "活动成果数据可应要求提供。", "Ask us →": "联系我们 →",
      "Have a brief?": "有需求？", "Start a project like this": "开启类似合作",
      "Please add your name, a valid email and a short brief.": "请填写姓名、有效邮箱和简要需求。",
      "Sending…": "发送中…", "Thanks! The team will be in touch soon.": "谢谢！团队会尽快与您联系。",
      "Something went wrong. Please email connect@brandinfinity.sg.": "发送失败，请发邮件至 connect@brandinfinity.sg。",
      "Opens your email app with the message ready.": "将打开您的邮件应用并自动填写内容。",
      "Your email app should open now. If not, write to connect@brandinfinity.sg.": "邮件应用即将打开。如未打开，请发邮件至 connect@brandinfinity.sg。"
    }
  };
  const LANGS = ["en", "th", "zh"];
  const HTML_LANG = { en: "en", th: "th", zh: "zh-Hans" };
  let lang = "en";
  try { const s = localStorage.getItem("bi-lang"); if (LANGS.includes(s)) lang = s; } catch (e) {}

  const t = (key, en) => (lang !== "en" && DICT[lang] && DICT[lang][key] != null ? DICT[lang][key] : (en != null ? en : key));

  const apply = (root = document) => {
    root.querySelectorAll("[data-i18n]").forEach((el) => {
      if (el.dataset.en == null) el.dataset.en = el.innerHTML;
      const tr = lang !== "en" && DICT[lang] ? DICT[lang][el.dataset.i18n] : null;
      if (tr != null) el.textContent = tr; else el.innerHTML = el.dataset.en;
    });
    root.querySelectorAll("[data-i18n-ph]").forEach((el) => {
      if (el.dataset.enPh == null) el.dataset.enPh = el.placeholder;
      el.placeholder = t(el.dataset.i18nPh, el.dataset.enPh);
    });
  };

  const fontFor = (l) => {
    if (l !== "th" || document.getElementById("font-th")) return;
    const ln = document.createElement("link");
    ln.id = "font-th"; ln.rel = "stylesheet";
    ln.href = "https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;600;800&display=swap";
    document.head.appendChild(ln);
  };

  const set = (l) => {
    if (!LANGS.includes(l)) l = "en";
    lang = l;
    document.documentElement.lang = HTML_LANG[l];
    document.documentElement.dataset.lang = l;
    fontFor(l);
    apply();
    try { localStorage.setItem("bi-lang", l); } catch (e) {}
    document.dispatchEvent(new CustomEvent("langchange", { detail: l }));
  };

  return { t, apply, set, get lang() { return lang; } };
})();
