<template>
  <UIDialogBox header="Error" v-model="dialogs.error">
    <div style="text-align: center">An error occurred. Please try the action again later.</div>
    <div style="text-align: center">Error: {{ dialogs.errorText }}</div>
  </UIDialogBox>

  <UIDialogBox header="Email verified!" v-model="dialogs.email.success" @close="refreshPage()">
    <div style="text-align: center">Your email has been successfully verified!</div>
  </UIDialogBox>

  <UIDialogBox header="Welcome" v-model="dialogs.firstTimeAccount">
    <div style="text-align: center; margin-bottom: 1em;">
      It looks like it's your first time here! Some next steps you might want to take are:
    </div>
    <div style="text-align: center; margin-bottom: 1em;">
      Add an email to your account. This will allow us to send you important email relating to our services. You can remove your email at any time.
    </div>
    <div style="text-align: center;">
      Start using some account-only features to use! You can now save and load configurations from our apps.
    </div>
  </UIDialogBox>

  <UIDialogBox header="Log Out" v-model="dialogs.logOut">
    <div style="text-align: center">You've successfully logged out of your account.</div>
  </UIDialogBox>

  <UIDialogBox header="Wrong Code" v-model="dialogs.email.incorrect">
    <div style="text-align: center">That's the wrong verification code. You have {{ dialogs.email.attempts }} attempt{{ dialogs.email.attempts == 1 ? "" : "s" }} remaining.</div>
  </UIDialogBox>

  <UIDialogBox header="Delete Account" v-model="dialogs.deleteAccountConfirm" :closeButtonHidden="true" :acceptButtonText="dialogs.deleteAccountField == `DELETE MY ACCOUNT` ? `Delete Account` : `Cancel`" @accept="accountDelete()">
    <div style="text-align: center; margin-bottom: 1em;">
      Are you sure you want to delete your account? This action is permanent and cannot be undone, effective immediately.
    </div>
    <div style="text-align: center; margin-bottom: 1em;">
      Data you have submitted will be removed from our servers. This includes any saved configurations, email addresses, and other personal information.
    </div>
    <div style="text-align: center; margin-bottom: 1em;">
      If you are sure, type <b>"DELETE MY ACCOUNT"</b> in the field below.
    </div>
    <div>
      <UIField v-model="dialogs.deleteAccountField" placeholder="Begin typing here..."></UIField>
    </div>
  </UIDialogBox>

  <UIDialogBox header="Delete Account" v-model="dialogs.deleteAccountSuccess" @close="refreshPage()">
    <div style="text-align: center">Your VCT Tools account has been successfully deleted. We hope to see you again soon!</div>
  </UIDialogBox>

  <UIDialogBox header="Update Email" v-model="dialogs.email.update" acceptButtonText="Update Email" @accept="updateEmail()">
    <div style="text-align: center; margin-bottom: 1em;">
      You can add or change your email address here. This will allow us to send you important email relating to our services. You can remove your email at any time.
    </div>
    <div style="margin-bottom: 1em;">
      <UIButtonLabel>Email Address</UIButtonLabel>
      <UIField placeholder="Email address" v-model="dialogs.email.input"></UIField>
    </div>
    <div style="text-align: center;">
      The email you provide will be sent a confirmation email. You must enter in the code that was sent to your email.
    </div>
  </UIDialogBox>

  <UIDialogBox header="Email Confirmation" v-model="dialogs.email.requestCode" acceptButtonText="Confirm Email" @accept="updateEmailConfirmCode()">
    <div style="text-align: center; margin-bottom: 1em;">
      A confirmation email has been sent to the email address on file. Please enter the code below to confirm your email address.
    </div>
    <div style="margin-bottom: 1em;">
      <UIButtonLabel>Confirmation Code</UIButtonLabel>
      <div style="display: flex; gap: 2px">
        <UIField placeholder="Confirmation code" v-model="dialogs.email.code"></UIField>
        <UIButton :disabled="dialogs.email.secondsUntilNewRequest != 0" @click="updateEmail()">Resend Email</UIButton>
      </div>
    </div>
    <div style="text-align: center; margin-bottom: 1em;">
      If you did not receive the email, please check your spam folder. If you still cannot find it, you can request another email in {{ dialogs.email.secondsUntilNewRequest }}s.
    </div>
    <div style="text-align: center;">
      <b>If you want to verify your email later, you can come back to this page. This dialog will open back up.</b>
    </div>
  </UIDialogBox>

  <UIDialogBox header="Remove Email" v-model="dialogs.email.remove" accept-button-text="Continue" close-button-text="Cancel" @accept="removeEmail()">
    <div style="text-align: center;">
      Are you sure you want to remove your email address? You won't receive any emails from us, including important notifications relating to your account, and changes to our Privacy Policy and Terms of Service.
    </div>
  </UIDialogBox>

  <UIDialogBox header="Data Request" v-model="dialogs.requestDataSuccess" @close="refreshPage()">
    <div style="text-align: center">Your data request has been successfully submitted. You will receive an email shortly.</div>
  </UIDialogBox>

  <div class="container">
    <header-container pageName="My Account">
      <div class="account-body" v-if="loaded">
        <div class="section">
          <div class="title">LOG IN // SIGN UP</div>
          <div class="content">
            <div class="panel">
              <div style="margin-bottom: 1em;">
                {{
                  accountStatus.loggedIn ?
                  `You are logged in as ${accountStatus.gameName}#${accountStatus.tagline}` :
                  "You are not logged in."
                }}
              </div>

              <div style="display: flex; gap: 2px; margin-bottom: 1em;">
                <UIButton :disabled="accountStatus.loggedIn" @click="openLogin()">Log in with Riot Games</UIButton>
                <UIButton :disabled="!accountStatus.loggedIn" @click="openLogout()">Log out</UIButton>
              </div>

              <div>
                By logging in, you agree to the <a href="/terms_of_service">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.
              </div>
            </div>
          </div>
        </div>

        <div class="section" v-if="false">
          <div class="title">BILLING</div>
          <div class="content">
            <div class="panel">
              Payments are handled by Tebex.
            </div>
          </div>
        </div>

        <div class="section" v-if="accountStatus.loggedIn">
          <div class="title">CONTACT</div>
          <div class="content">
            <div class="panel">
              <span style="display: inline-block; margin-bottom: 1em;">You may add your email address to your account information to receive alerts.</span>
              <span style="display: inline-block; margin-bottom: 1em;">Email address on file: {{ accountStatus.email || "N/A"}}</span>
              <div style="display: flex; gap: 2px;">
                <UIButton @click="dialogs.email.update = true">Add or change email address</UIButton>
                <UIButton @click="dialogs.email.remove = true" :disabled="accountStatus.email == null">Remove email address</UIButton>
              </div>
            </div>
          </div>
        </div>

        <div class="section" v-if="accountStatus.loggedIn">
          <div class="title">MANAGE ACCOUNT</div>
          <div class="content">
            <div class="panel">
              <span style="display: inline-block; margin-bottom: 1em;">In accordance with the <a href="/privacy">Privacy Policy</a>, you are able to get a copy of all your data stored by VCT Tools.</span>
              <span style="display: inline-block; margin-bottom: 1em;">
                <BIconExclamationTriangleFill style="vertical-align: bottom;"></BIconExclamationTriangleFill>
                You need to have a verified email address to request a copy of your data.
              </span>
              <span style="display: inline-block; margin-bottom: 1em;">
                <BIconExclamationTriangleFill style="vertical-align: bottom;"></BIconExclamationTriangleFill>
                You can only submit a data request once every 30 days.
              </span>
              <UIButton :disabled="accountStatus.email == null" @click="requestData()">Request a copy of your data</UIButton>
            </div>
            <div class="panel">
              <span style="display: inline-block; margin-bottom: 1em;">Deleting your account is permanent and effective immediately.</span>
              <UIButton @click="dialogs.deleteAccountConfirm = true">Delete my account</UIButton>
            </div>
          </div>
        </div>
      </div>
      <div class="account-body" v-else>
        <UIThrobber></UIThrobber>
      </div>
    </header-container>
  </div>
</template>

<style scoped>
.container {
  width: 100vw;
  min-height: 100vh;

  display: flex;
  flex-direction: column;

  align-items: center;
}

.account-body {
  width: 100%;
  max-width: 800px;
  flex: 1;

  font-size: 12pt;

  display: flex;
  flex-direction: column;
  gap: 1em;
}

.section {
  display: flex;
}

.section .title {
  font-family: Tungsten, sans-serif !important;
  color: #e0ebb9;

  padding-right: 1em;

  font-size: 36pt;
  flex: 1 1 0;
  text-align: right;
}

.section .content {
  width: 60%;

  display: flex;
  flex-direction: column;
  gap: 1em;
}

.section .content .panel {
  background-color: #54758142;
  padding: 1em;

  border-left: 2px solid #04ca8f;
  border-right: 2px solid #04ca8f;
}
</style>

<script setup lang="ts">
import HeaderContainer from "@/components/HeaderContainer.vue";
import { BIconExclamationTriangleFill } from "bootstrap-icons-vue";
import { UIButton, UIButtonLabel, UIDialogBox, UIField, UIThrobber } from "vct-tools-components";
import { ref } from "vue";

const accountStatus = ref({
  loggedIn: false,
  gameName: null,
  tagline: null,
  email: null,
  pendingEmailVerification: false
});

const dialogs = ref({
  firstTimeAccount: new URLSearchParams(document.location.search).has("newaccount"),
  logOut: new URLSearchParams(document.location.search).has("logout"),
  deleteAccountConfirm: false,
  deleteAccountField: "",
  deleteAccountSuccess: false,
  email: {
    update: false,
    requestCode: false,
    secondsUntilNewRequest: 0,
    code: "",
    input: "",
    success: false,
    incorrect: false,
    attempts: 3,
    remove: false
  },
  error: false,
  errorText: "",
  requestDataSuccess: false
});

const loaded = ref(false);

const openLogin = () => {
  window.location.href = import.meta.env.DEV ? "http://localhost/v1/rso_flow/login_redirect" : "https://api.vcttools.net/v1/rso_flow/login_redirect";
}

const openLogout = () => {
  window.location.href = import.meta.env.DEV ? "http://localhost/v1/rso_flow/logout_callback" : "https://api.vcttools.net/v1/rso_flow/logout_callback";
}

const accountDelete = async () => {
  dialogs.value.deleteAccountConfirm = false;

  if (dialogs.value.deleteAccountField != "DELETE MY ACCOUNT") {
    dialogs.value.deleteAccountField = "";
    return;
  }

  loaded.value = false;

  const r = await fetch(import.meta.env.DEV ? "http://localhost/v1/account/account_delete" : "https://api.vcttools.net/v1/account/account_delete", {
    method: "DELETE",
    credentials: "include"
  });

  loaded.value = true;

  if (r.ok) {
    dialogs.value.deleteAccountSuccess = true;
  } else {
    dialogs.value.error = true;
    dialogs.value.errorText = (await r.json()).error;

    dialogs.value.deleteAccountField = "";
    dialogs.value.deleteAccountConfirm = false;
  }
}

const updateEmail = async () => {
  dialogs.value.email.requestCode = false;
  dialogs.value.email.update = false;
  loaded.value = false;

  const rf = new URLSearchParams();
  rf.append("email", dialogs.value.email.input);

  const r = await fetch(import.meta.env.DEV ? "http://localhost/v1/account/account_email/update" : "https://api.vcttools.net/v1/account/account_email/update", {
    method: "POST",
    credentials: "include",
    body: rf.toString(),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });

  loaded.value = true;

  if (!r.ok) {
    dialogs.value.error = true;
    dialogs.value.errorText = (await r.json()).error;
    return;
  }

  startNewEmailRequest();
  dialogs.value.email.requestCode = true;
}

const updateEmailConfirmCode = async () => {
  dialogs.value.email.requestCode = false;
  loaded.value = false;

  const rf = new URLSearchParams();
  rf.append("code", dialogs.value.email.code.trim());

  const r = await fetch(import.meta.env.DEV ? "http://localhost/v1/account/account_email/verify" : "https://api.vcttools.net/v1/account/account_email/verify", {
    method: "POST",
    credentials: "include",
    body: rf.toString(),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });

  loaded.value = true;

  if (!r.ok) {
    dialogs.value.email.incorrect = true;
    dialogs.value.email.attempts = (await r.json()).attempts;
    return;
  }

  dialogs.value.email.success = true;
}

const startNewEmailRequest = () => {
  dialogs.value.email.secondsUntilNewRequest = 60;
  const interval = setInterval(() => {
    dialogs.value.email.secondsUntilNewRequest -= 1;
    if (dialogs.value.email.secondsUntilNewRequest == 0) {
      clearInterval(interval);
    }
  }, 1000);
}

const removeEmail = async () => {
  dialogs.value.email.remove = false;
  loaded.value = false;

  const r = await fetch(import.meta.env.DEV ? "http://localhost/v1/account/account_email/unlink" : "https://api.vcttools.net/v1/account/account_email/unlink", {
    method: "DELETE",
    credentials: "include"
  });

  loaded.value = true;

  if (!r.ok) {
    dialogs.value.error = true;
    dialogs.value.errorText = (await r.json()).error;
    return;
  }

  dialogs.value.email.remove = false;

  refreshPage();
}

const requestData = async () => {
  loaded.value = false;

  const r = await fetch(import.meta.env.DEV ? "http://localhost/v1/account/data_request" : "https://api.vcttools.net/v1/account/data_request", {
    credentials: "include"
  });

  loaded.value = true;

  if (!r.ok) {
    dialogs.value.error = true;
    dialogs.value.errorText = (await r.json()).error;
    return;
  }

  dialogs.value.requestDataSuccess = true;
}

const refreshPage = () => {
  window.location.reload();
}

(async () => {
  const response = await fetch(import.meta.env.DEV ? "http://localhost/v1/account/account_info" : "https://api.vcttools.net/v1/account/account_info", { credentials: "include" });

  if (response.ok) {
    const data = (await response.json()).data;
    accountStatus.value = {
      loggedIn: true,
      gameName: data.riotGameName,
      tagline: data.riotTagLine,
      email: data.email,
      pendingEmailVerification: data.pendingEmailVerification
    };
  } else {
    accountStatus.value = {
      loggedIn: false,
      gameName: null,
      tagline: null,
      email: null,
      pendingEmailVerification: false
    };
  }

  loaded.value = true;

  if (accountStatus.value.pendingEmailVerification) {
    startNewEmailRequest();
    dialogs.value.email.requestCode = true;
  }
})();
</script>
