const aiIcon = document.getElementById("aiIcon");
    const aiPopup = document.getElementById("aiPopup");
    const closePopup = document.getElementById("closePopup");
    const messagesContainer = document.querySelector(".messages");
    const userInput = document.querySelector(".user-input");
    const sendBtn = document.getElementById("sendBtn");

    aiIcon.addEventListener("click", () => {
      aiPopup.style.display = "block";
    });
    closePopup.addEventListener("click", () => {
      aiPopup.style.display = "none";
    });

    const botReplies = [
      { keywords: ["مرحبا", "اهلا", "hello","hi"], reply: "👋 مرحبا! كيف أقدر أساعدك اليوم؟" },
      { keywords: ["كيف", "كيف حالك", "how are you","عامل اي "], reply: "😊 أنا بوت مساعد، جاهز أساعدك في أي شيء تحتاجه." },
      { keywords: ["شكرا", "thank you"], reply: "🙏 العفو! إذا عندك أي سؤال تاني، أنا هنا." },
      { keywords: [ "السلام عليكم "], reply: "وعليكم السلام اقدر اساعدك ب اي " },
      { keywords: ["صباح الخير "], reply: "صباح النور اقدر اساعدك ب اي " },
      { keywords: ["سعر", "الاسعار", "price"], reply: "💰 الأسعار تبدأ من 500 EGP لحد 5000 EGP حسب المنتج." },
      { keywords: ["تيشيرت", "شرت", "shirt"], reply: "👕 عندنا تيشيرتات (Gray, Black, Argentina, Barcelona, Ahly) بأسعار من 1000 لـ 2300 EGP." },
      { keywords: ["شوز", "حذاء", "جزمة", "shoes"], reply: "👟 الشوز الرياضي متاح بسعر 2200 EGP." },
      { keywords: ["طقم", "set"], reply: "👔 متوفر أطقم كاملة (NASA, Brown, Gray Summer) بأسعار من 1800 لـ 3000 EGP." },
      { keywords: ["جاكيت", "jacket"], reply: "🧥 الجاكيتات (Black, Gray) متاحة بسعر 2500 EGP." },
      { keywords: ["بنطلون", "pants"], reply: "👖 البنطلونات (Black, Gray) متاحة بسعر 1500 EGP." },
      { keywords: ["هودي", "hoodie"], reply: "🧥 الهوديز (Black, Gray) متاحة بسعر 2000 EGP." },
      { keywords: ["كاب", "cap"], reply: "🧢 الكابات (Black, Gray) متاحة بسعر 500 EGP." },
      { keywords: ["برشلونه ","الاهلي","الارجنتين", "تيشرتات رياضيه ","رياضه","شرت", "shirt"], reply: "👕 عندنا تيشيرتات ( Argentina, Barcelona, Ahly) بأسعار من 1000 لـ 2300 EGP." },
      { keywords: ["شرت", "shirt"], reply: "👕 عندنا تيشيرتات (Gray, Black, ) بأسعار من 1000 لـ 2300 EGP." },
      { keywords: ["منتجات", "products"], reply: "🛍️ زور قسم المنتجات في الموقع علشان تشوف كل حاجة متاحة." },
      { keywords: ["تواصل", "contact", "رقم"], reply: " عن طريق صفحات السوشيال ميديا " },
      { keywords: ["انت مين"], reply: "⚡أنا بوت مساعد" },
      { keywords: ["صاحب الموقع" ,"مصمم الموقع"], reply: "📞 للتواصل مع صاحب الموقع: Zizo Elsadany على رقم01553516623." },
      { keywords: ["سلام", "باي", "bye"], reply: "👋 مع السلامة، نتمنى نشوفك تاني." },
      { keywords: ["هل في توصيل ", " نوصيل محافظات ", "توصيل","التوصيل"], reply: "👋 ايو في توصيل لكل المحافظات المنتج بيوصل خلال 5ايام" },
      { keywords: ["هل في كاش", "الدفع عند الاستلام", "cash on delivery","طريقه الدفع","دفع"], reply: " في كاش عند الاستلام وفي دفع عن طريق فوري وفيزا و جميع خدمات الدفع الالكتروني موجوده"},
      { keywords: ["هل في خصم", "خصم", "discount"], reply: "🎉 ايو في خصم 10% على اول طلبية" },
      { keywords: ["هل في ضمان", "الضمان", "guarantee"], reply: "🛡️ ايو في ضمان 6 شهور على كل المنتجات" },
    ];

    function addMessage(sender, text) {
      const msg = document.createElement("div");
      msg.classList.add("message", sender);
      msg.textContent = text;
      messagesContainer.appendChild(msg);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function sendMessage(text) {
      if (!text.trim()) return;
      addMessage("user", text);

      let reply = "🤔 مش فاهم قصدك، حاول تسأل عن (الاسعار - المنتجات - التواصل).";
      for (let item of botReplies) {
        if (item.keywords.some(word => text.toLowerCase().includes(word))) {
          reply = item.reply;
          break;
        }
      }

      setTimeout(() => addMessage("bot", reply), 500);
    }

    sendBtn.addEventListener("click", () => {
      sendMessage(userInput.value);
      userInput.value = "";
    });

    userInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        sendMessage(userInput.value);
        userInput.value = "";
      }
    });