/* =========================================
   SME SHIELD
   Week 8 — Working Prototype
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     DEMO BUSINESS DATA
  ========================================= */

  const demoBusiness = {
    name: "Taquería El Buen Sabor",
    type: "restaurant",
    employees: "6-20",
    emailSystem: "google",
    score: 62
  };


  /* =========================================
     ONBOARDING
  ========================================= */

  const onboardingForm =
    document.getElementById("onboardingForm");

  if (onboardingForm) {

    onboardingForm.addEventListener("submit", (event) => {

      event.preventDefault();

      const businessName =
        document.getElementById("businessName").value.trim();

      const businessType =
        document.getElementById("businessType").value;

      const employees =
        document.getElementById("employees").value;

      const emailSystem =
        document.getElementById("emailSystem").value;


      if (!businessName || !businessType || !employees) {

        alert(
          "Please complete the required business information."
        );

        return;
      }


      const businessData = {
        name: businessName,
        type: businessType,
        employees: employees,
        emailSystem: emailSystem || "not specified",
        score: 62
      };


      localStorage.setItem(
        "smeShieldBusiness",
        JSON.stringify(businessData)
      );


      showOnboardingSuccess(businessData);

    });

  }


  /* =========================================
     LOAD SAVED BUSINESS
  ========================================= */

  const savedBusiness =
    localStorage.getItem("smeShieldBusiness");

  if (savedBusiness) {

    try {

      const business =
        JSON.parse(savedBusiness);

      updateBusinessName(business.name);

    } catch (error) {

      console.warn(
        "Could not load saved business data."
      );

    }

  }


  /* =========================================
     ACTION BUTTONS
  ========================================= */

  const actionButtons =
    document.querySelectorAll(".action-button");


  actionButtons.forEach((button, index) => {

    button.addEventListener("click", () => {

      handleSecurityAction(index);

    });

  });


  /* =========================================
     INCIDENT RESPONSE
  ========================================= */

  const incidentButton =
    document.getElementById("incidentButton");


  if (incidentButton) {

    incidentButton.addEventListener("click", () => {

      openIncidentResponse();

    });

  }


  /* =========================================
     SMOOTH NAVIGATION
  ========================================= */

  document.querySelectorAll(
    'a[href^="#"]'
  ).forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId =
        link.getAttribute("href");

      const target =
        document.querySelector(targetId);

      if (target) {

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    });

  });


});


/* =========================================
   ONBOARDING SUCCESS
========================================= */

function showOnboardingSuccess(business) {

  const form =
    document.getElementById("onboardingForm");

  if (!form) return;


  form.innerHTML = `

    <div
      style="
        padding: 28px;
        background: #e9f8f2;
        border: 1px solid #b8ead7;
        border-radius: 12px;
      "
    >

      <strong
        style="
          display: block;
          color: #159570;
          font-size: 18px;
          margin-bottom: 8px;
        "
      >
        Business added successfully
      </strong>

      <p
        style="
          color: #475569;
          font-size: 13px;
          margin-bottom: 18px;
        "
      >
        SME Shield created a simulated starting point
        for <strong>${escapeHTML(business.name)}</strong>.
      </p>

      <div
        style="
          padding: 14px;
          background: white;
          border-radius: 9px;
          margin-bottom: 18px;
        "
      >

        <strong>Next step</strong>

        <p
          style="
            color: #64748b;
            font-size: 12px;
            margin-top: 4px;
          "
        >
          Review the five priority actions in the
          dashboard.
        </p>

      </div>

      <a
        href="#actions"
        class="primary-button"
      >
        View my protection dashboard →
      </a>

    </div>

  `;

}


/* =========================================
   UPDATE BUSINESS NAME
========================================= */

function updateBusinessName(name) {

  const businessTitles =
    document.querySelectorAll(
      ".card-top h3"
    );


  if (businessTitles.length > 0) {

    businessTitles[0].textContent =
      name;

  }

}


/* =========================================
   SECURITY ACTIONS
========================================= */

function handleSecurityAction(index) {

  const actions = [

    {
      title: "Activate two-step verification",

      text:
        "Protect the main business email account with two-step verification. This is a simulated recommendation.",

      priority: "HIGH"
    },

    {
      title: "Review account access",

      text:
        "Check which people still have access to business accounts and remove access that is no longer necessary.",

      priority: "HIGH"
    },

    {
      title: "Verify your backups",

      text:
        "Confirm that critical business information has a usable backup and that the backup can be restored.",

      priority: "MEDIUM"
    },

    {
      title: "Update devices and systems",

      text:
        "Identify business devices and systems that may be missing important updates.",

      priority: "MEDIUM"
    },

    {
      title: "Define an incident response plan",

      text:
        "Write down what the business should do first and who should be contacted if an incident occurs.",

      priority: "LOW"
    }

  ];


  const action =
    actions[index];


  if (!action) return;


  const message = `

${action.title}

Priority: ${action.priority}

${action.text}

--------------------------------

SIMULATED DEMO

This is guidance inside a prototype.
It is not a cybersecurity certification,
guarantee or automatic security decision.

Human review remains necessary for
important security actions.

  `;


  alert(message);

}


/* =========================================
   INCIDENT RESPONSE
========================================= */

function openIncidentResponse() {

  const existing =
    document.getElementById(
      "incidentModal"
    );


  if (existing) {

    existing.remove();

  }


  const modal =
    document.createElement("div");

  modal.id =
    "incidentModal";


  modal.innerHTML = `

    <div
      style="
        position: fixed;
        inset: 0;
        z-index: 3000;

        display: flex;
        align-items: center;
        justify-content: center;

        padding: 20px;

        background: rgba(4, 18, 37, 0.72);
      "
    >

      <div
        style="
          width: min(560px, 100%);

          padding: 30px;

          background: white;

          border-radius: 18px;

          box-shadow: 0 24px 70px rgba(0,0,0,0.25);
        "
      >

        <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;

            gap: 20px;

            margin-bottom: 20px;
          "
        >

          <div>

            <span
              style="
                display: block;

                color: #64748b;

                font-size: 10px;
                font-weight: 800;

                letter-spacing: 0.12em;
              "
            >
              INCIDENT RESPONSE
            </span>

            <h2
              style="
                margin-top: 5px;

                color: #111827;

                font-size: 25px;
              "
            >
              Something happened?
            </h2>

          </div>

          <button
            id="closeIncident"
            style="
              width: 36px;
              height: 36px;

              border: none;

              border-radius: 50%;

              background: #eef2f6;

              color: #475569;

              font-size: 20px;
            "
          >
            ×
          </button>

        </div>


        <div
          style="
            padding: 16px;

            background: #fff6d8;

            border: 1px solid #f2df9b;

            border-radius: 10px;

            color: #705200;

            font-size: 12px;

            margin-bottom: 20px;
          "
        >

          <strong>
            Prototype guidance
          </strong>

          <p
            style="
              margin-top: 5px;
            "
          >
            This does not diagnose or automatically resolve
            a cybersecurity incident. Important incidents
            should be reviewed by a qualified human.
          </p>

        </div>


        <div
          style="
            display: grid;
            gap: 10px;
          "
        >

          <div
            style="
              padding: 15px;

              border: 1px solid #dce3eb;

              border-radius: 10px;
            "
          >

            <strong>
              01 · Identify
            </strong>

            <p
              style="
                color: #64748b;
                font-size: 12px;
                margin-top: 4px;
              "
            >
              Record what happened and when you noticed it.
            </p>

          </div>


          <div
            style="
              padding: 15px;

              border: 1px solid #dce3eb;

              border-radius: 10px;
            "
          >

            <strong>
              02 · Contain
            </strong>

            <p
              style="
                color: #64748b;
                font-size: 12px;
                margin-top: 4px;
              "
            >
              Follow the immediate containment guidance
              appropriate to the situation.
            </p>

          </div>


          <div
            style="
              padding: 15px;

              border: 1px solid #dce3eb;

              border-radius: 10px;
            "
          >

            <strong>
              03 · Escalate
            </strong>

            <p
              style="
                color: #64748b;
                font-size: 12px;
                margin-top: 4px;
              "
            >
              Connect with a human cybersecurity professional
              when the situation requires specialist help.
            </p>

          </div>


          <div
            style="
              padding: 15px;

              border: 1px solid #dce3eb;

              border-radius: 10px;
            "
          >

            <strong>
              04 · Recover
            </strong>

            <p
              style="
                color: #64748b;
                font-size: 12px;
                margin-top: 4px;
              "
            >
              Restore operations and review what should
              change to reduce future exposure.
            </p>

          </div>

        </div>


        <button
          id="humanSupportButton"
          class="primary-button full-width"
          style="margin-top: 20px;"
        >
          Contact human support
        </button>


        <p
          id="supportMessage"
          style="
            display: none;

            margin-top: 12px;

            padding: 12px;

            background: #e9f8f2;

            color: #159570;

            border-radius: 8px;

            font-size: 12px;

            text-align: center;
          "
        >
          Human support request simulated.
          No real contact was created.
        </p>

      </div>

    </div>

  `;


  document.body.appendChild(modal);


  const closeButton =
    document.getElementById(
      "closeIncident"
    );


  closeButton.addEventListener(
    "click",
    () => {
      modal.remove();
    }
  );


  const supportButton =
    document.getElementById(
      "humanSupportButton"
    );


  const supportMessage =
    document.getElementById(
      "supportMessage"
    );


  supportButton.addEventListener(
    "click",
    () => {

      supportMessage.style.display =
        "block";

      supportButton.textContent =
        "Request simulated";

      supportButton.disabled =
        true;

    }
  );


  modal.addEventListener(
    "click",
    (event) => {

      if (
        event.target ===
        modal.firstElementChild
      ) {

        modal.remove();

      }

    }
  );

}


/* =========================================
   HTML ESCAPING
========================================= */

function escapeHTML(value) {

  return String(value)

    .replace(
      /&/g,
      "&amp;"
    )

    .replace(
      /</g,
      "&lt;"
    )

    .replace(
      />/g,
      "&gt;"
    )

    .replace(
      /"/g,
      "&quot;"
    )

    .replace(
      /'/g,
      "&#039;"
    );

}
