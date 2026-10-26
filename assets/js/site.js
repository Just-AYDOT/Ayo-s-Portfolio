(function () {
  var EMAIL = "ayoinitiatives@gmail.com";

  function toast(msg) {
    var t = document.querySelector(".toast");
    if (!t) {
      t = document.createElement("div");
      t.className = "toast";
      t.setAttribute("role", "status");
      t.setAttribute("aria-live", "polite");
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add("is-on");
    clearTimeout(t._h);
    t._h = setTimeout(function () { t.classList.remove("is-on"); }, 2200);
  }

  // Mobile hamburger menu
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".menu-toggle");
  if (header && toggle) {
    var setMenu = function (open) {
      header.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
    toggle.addEventListener("click", function () { setMenu(!header.classList.contains("is-open")); });
    document.querySelectorAll("#site-menu a").forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && header.classList.contains("is-open")) { setMenu(false); toggle.focus(); }
    });
    document.addEventListener("click", function (e) {
      if (header.classList.contains("is-open") && !header.contains(e.target)) setMenu(false);
    });
    window.matchMedia("(min-width: 761px)").addEventListener("change", function (m) { if (m.matches) setMenu(false); });
  }

  // Copy email
  document.querySelectorAll("[data-copy-email]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var done = function () { toast("Email copied"); };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(EMAIL).then(done, function () { window.location.href = "mailto:" + EMAIL; });
      } else {
        var ta = document.createElement("textarea");
        ta.value = EMAIL;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); done(); } catch (e) { window.location.href = "mailto:" + EMAIL; }
        document.body.removeChild(ta);
      }
    });
  });

  // Work filters
  var filters = document.querySelectorAll("[data-filter]");
  filters.forEach(function (f) {
    f.addEventListener("click", function () {
      var key = f.getAttribute("data-filter");
      filters.forEach(function (o) { o.setAttribute("aria-pressed", String(o === f)); });
      document.querySelectorAll("[data-group]").forEach(function (g) {
        g.hidden = key !== "all" && g.getAttribute("data-group") !== key;
      });
    });
  });

  // FAQ accordion
  document.querySelectorAll(".faq__q").forEach(function (q) {
    q.addEventListener("click", function () {
      var open = q.getAttribute("aria-expanded") === "true";
      var a = document.getElementById(q.getAttribute("aria-controls"));
      q.setAttribute("aria-expanded", String(!open));
      q.querySelector(".faq__sign").textContent = open ? "+" : "−";
      if (a) a.hidden = open;
    });
  });

  // Brief chips
  document.querySelectorAll(".chip").forEach(function (c) {
    c.addEventListener("click", function () {
      var on = c.getAttribute("aria-pressed") !== "true";
      c.setAttribute("aria-pressed", String(on));
      var label = c.getAttribute("data-label");
      c.textContent = on ? "✓ " + label : label;
    });
  });

  // Selects: switch from placeholder colour once chosen
  document.querySelectorAll("select.input").forEach(function (s) {
    s.addEventListener("change", function () { s.classList.toggle("has-value", !!s.value); });
  });

  // Brief form: opens the visitor's email app with the brief filled in
  var form = document.getElementById("brief");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var needs = Array.prototype.map.call(form.querySelectorAll('.chip[aria-pressed="true"]'), function (c) {
        return c.getAttribute("data-label");
      });
      var lines = [
        "Name: " + (d.get("name") || ""),
        "Email: " + (d.get("email") || ""),
        "Company: " + (d.get("company") || ""),
        "Needs: " + needs.join(", "),
        "Budget: " + (d.get("budget") || ""),
        "Timeline: " + (d.get("timeline") || ""),
        "",
        d.get("about") || "",
        "",
        "Signed: " + (d.get("signature") || "")
      ];
      var subject = "Project brief from " + (d.get("name") || "a visitor");
      window.location.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(lines.join("\n"));
    });
  }
})();
