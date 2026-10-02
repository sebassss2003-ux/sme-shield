document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     ONBOARDING
  ========================= */

  const onboardingForm = document.getElementById("onboardingForm");
  const onboardingMessage = document.getElementById("onboardingMessage");
  const dashboardTitle = document.getElementById("dashboardTitle");

  const savedBusiness = JSON.parse(
    localStorage.getItem("smeShieldBusiness") || "null"
  );

  if (savedBusiness) {
    updateBusinessView(savedBusiness);
  }

  onboardingForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const businessName = document.getElementById("businessName").value.trim();
    const businessType = document.getElementById("businessType").value;
    const employees = document.getElementById("employees").value;

    if (!businessName || !businessType || !employees) {
      onboardingMessage.textContent =
        "Please complete all fields before continuing.";
      return;
    }

    const business = {
      name: businessName,
      type: businessType,
      employees: employees
    };

    localStorage.setItem(
      "smeShieldBusiness",
      JSON.stringify(business)
    );

    updateBusinessView(business);

    onboardingMessage.textContent =
      "Business profile saved locally. Your protection view is ready.";
  });

  function updateBusinessView(business) {
    if (dashboardTitle) {
      dashboardTitle.textContent =
        `${business.name} — protection view`;
    }
  }


  /* =========================
     DEVICE & ACCOUNT INVENTORY
  ========================= */

  const deviceCheckboxes = document.querySelectorAll(
    ".inventory-card:first-child .inventory-item"
  );

  const accountCheckboxes = document.querySelectorAll(
    ".inventory-card:nth-child(2) .inventory-item"
  );

  const deviceCount = document.getElementById("deviceCount");
  const accountCount = document.getElementById("accountCount");
  const inventoryStatus = document.getElementById("inventoryStatus");
  const inventoryMessage = document.getElementById("inventoryMessage");
  const reviewInventory = document.getElementById("reviewInventory");

  const savedInventory = JSON.parse(
    localStorage.getItem("smeShieldInventory") || "null"
  );

  if (savedInventory) {
    restoreInventory(savedInventory);
  }

  deviceCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", updateInventoryCounts);
  });

  accountCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", updateInventoryCounts);
  });

  reviewInventory?.addEventListener("click", () => {

    const devices = Array.from(deviceCheckboxes)
      .map((checkbox) => checkbox.checked);

    const accounts = Array.from(accountCheckboxes)
      .map((checkbox) => checkbox.checked);

    const inventory = {
      devices,
      accounts,
      reviewedAt: new Date().toISOString()
    };

    localStorage.setItem(
      "smeShieldInventory",
      JSON.stringify(inventory)
    );

    updateInventoryCounts();

    const totalDevices = devices.filter(Boolean).length;
    const totalAccounts = accounts.filter(Boolean).length;

    if (totalDevices === 0 && totalAccounts === 0) {

      inventoryStatus.textContent = "Needs information";

      inventoryMessage.textContent =
        "Select the devices and accounts your business depends on.";

      return;
    }

    inventoryStatus.textContent = "Reviewed";

    inventoryMessage.textContent =
      `Inventory saved locally: ${totalDevices} device categories and ${totalAccounts} account categories identified.`;

    generatePriorityView(inventory);
  });

  function updateInventoryCounts() {

    const devices = Array.from(deviceCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .length;

    const accounts = Array.from(accountCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .length;

    if (deviceCount) {
      deviceCount.textContent = devices;
    }

    if (accountCount) {
      accountCount.textContent = accounts;
    }
  }

  function restoreInventory(inventory) {

    inventory.devices?.forEach((checked, index) => {

      if (deviceCheckboxes[index]) {
        deviceCheckboxes[index].checked = checked;
      }

    });

    inventory.accounts?.forEach((checked, index) => {

      if (accountCheckboxes[index]) {
        accountCheckboxes[index].checked = checked;
      }

    });

    updateInventoryCounts();

    if (
      inventory.devices?.some(Boolean) ||
      inventory.accounts?.some(Boolean)
    ) {

      inventoryStatus.textContent = "Reviewed";

      inventoryMessage.textContent =
        "Previously saved inventory restored.";

      generatePriorityView(inventory);
    }
  }


  /* =========================
     PRIORITY LOGIC
  ========================= */

  function generatePriorityView(inventory) {

    const hasDevices =
      inventory.devices?.some(Boolean);

    const hasAccounts =
      inventory.accounts?.some(Boolean);

    const accountAction =
      document.querySelector('[data-action="accounts"]');

    const updateAction =
      document.querySelector('[data-action="updates"]');

    const backupAction =
      document.querySelector('[data-action="backups"]');

    const accessAction =
      document.querySelector('[data-action="access"]');

    const responseAction =
      document.querySelector('[data-action="response"]');

    /*
      SME Shield deliberately keeps the logic narrow.
      It does not calculate a fake "security score".
      It simply highlights actions connected to the
      business inventory.
    */

    if (hasAccounts && accountAction) {
      accountAction.classList.add("priority-highlight");
    }

    if (hasDevices && updateAction) {
      updateAction.classList.add("priority-highlight");
    }

    if ((hasDevices || hasAccounts) && backupAction) {
      backupAction.classList.add("priority-highlight");
    }

    if (hasAccounts && accessAction) {
      accessAction.classList.add("priority-highlight");
    }

    if ((hasDevices || hasAccounts) && responseAction) {
      responseAction.classList.add("priority-highlight");
    }

    localStorage.setItem(
      "smeShieldPriorityGenerated",
      "true"
    );
  }


  /* =========================
     PRIORITY ACTIONS
  ========================= */

  const actionCards = document.querySelectorAll(".action-card");

  const recommendationPanel =
    document.getElementById("recommendationPanel");

  const recommendationTitle =
    document.getElementById("recommendationTitle");

  const recommendationText =
    document.getElementById("recommendationText");

  const recommendationNext =
    document.getElementById("recommendationNext");

  const closeRecommendation =
    document.getElementById("closeRecommendation");

  const recommendations = {

    accounts: {
      title: "Protect critical accounts",
      text:
        "SIMULATED AI: Your most important accounts should have stronger access controls and clearly assigned ownership.",
      next:
        "List your critical email, banking and business software accounts and verify who controls each one."
    },

    updates: {
      title: "Update important devices",
      text:
        "SIMULATED AI: Outdated devices can create preventable exposure for a small business.",
      next:
        "Identify the devices that access important business information and verify that they receive current updates."
    },

    backups: {
      title: "Verify backups",
      text:
        "SIMULATED AI: A backup only creates continuity value if the business can actually recover from it.",
      next:
        "Identify your most important business data and perform a recovery test."
    },

    access: {
      title: "Reduce unnecessary access",
      text:
        "SIMULATED AI: Unnecessary access can increase the impact of a compromised account.",
      next:
        "Review who has access to important business systems and remove access that is no longer necessary."
    },

    response: {
      title: "Prepare for an incident",
      text:
        "SIMULATED AI: A simple response path can reduce confusion when an incident occurs.",
      next:
        "Write down the first three people or services your business would contact during a security incident."
    }

  };

  actionCards.forEach((card) => {

    card.addEventListener("click", () => {

      const action = card.dataset.action;
      const recommendation = recommendations[action];

      if (!recommendation) return;

      recommendationTitle.textContent =
        recommendation.title;

      recommendationText.textContent =
        recommendation.text;

      recommendationNext.textContent =
        recommendation.next;

      recommendationPanel.classList.remove("hidden");

      recommendationPanel.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

    });

  });

  closeRecommendation?.addEventListener("click", () => {

    recommendationPanel.classList.add("hidden");

  });


  /* =========================
     BACKUP REVIEW
  ========================= */

  const verifyBackup =
    document.getElementById("verifyBackup");

  verifyBackup?.addEventListener("click", () => {

    verifyBackup.textContent =
      "Backup review started";

    verifyBackup.disabled = true;

    setTimeout(() => {

      verifyBackup.textContent =
        "Review recovery test";

      verifyBackup.disabled = false;

    }, 1800);

  });


  /* =========================
     INCIDENT RESPONSE
  ========================= */

  const incidentButton =
    document.getElementById("incidentButton");

  const incidentModal =
    document.getElementById("incidentModal");

  const closeIncident =
    document.getElementById("closeIncident");

  incidentButton?.addEventListener("click", () => {

    incidentModal.classList.remove("hidden");

  });

  closeIncident?.addEventListener("click", () => {

    incidentModal.classList.add("hidden");

  });

  incidentModal?.addEventListener("click", (event) => {

    if (event.target === incidentModal) {
      incidentModal.classList.add("hidden");
    }

  });


  /* =========================
     NAVIGATION
  ========================= */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId =
        link.getAttribute("href");

      const target =
        document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth"
      });

    });

  });

});
