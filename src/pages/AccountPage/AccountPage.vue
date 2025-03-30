<template>
  <div class="container">
    <header-container pageName="My Account">
      <div class="account-body">
        <div class="section">
          <div class="title">WARNING</div>
          <div class="content">
            <div class="panel">This page is not fully complete, and some buttons don't work at the moment. Notice that if you log in, you will not be able to Log out, Add or change email address, Remove email address, Request a copy of your data, or Delete your account.</div>
          </div>
        </div>

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

        <div class="section">
          <div class="title">CONTACT</div>
          <div class="content">
            <div class="panel">
              <span style="display: inline-block; margin-bottom: 1em;">You may add your email address to your account information to receive alerts.</span>
              <span style="display: inline-block; margin-bottom: 1em;">Email address on file: {{ accountStatus.email || "N/A"}}</span>
              <div style="display: flex; gap: 2px;">
                <UIButton :disabled="true">Add or change email address</UIButton>
                <UIButton :disabled="accountStatus.email == null">Remove email address</UIButton>
              </div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="title">MANAGE ACCOUNT</div>
          <div class="content">
            <div class="panel">
              <span style="display: inline-block; margin-bottom: 1em;">In accordance with the <a href="/privacy">Privacy Policy</a>, you are able to get a copy of all your data stored by VCT Tools.</span>
              <UIButton :disabled="true">Request a copy of your data</UIButton>
            </div>
            <div class="panel">
              <span style="display: inline-block; margin-bottom: 1em;">Deleting your account is permanent and effective immediately.</span>
              <UIButton :disabled="true">Delete my account</UIButton>
            </div>
          </div>
        </div>
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
import { UIButton } from "vct-tools-components";
import { ref } from "vue";

const accountStatus = ref({
  loggedIn: false,
  gameName: null,
  tagline: null,
  email: null
});

const openLogin = () => {
  window.location.href = import.meta.env.DEV ? "http://localhost/v1/rso_flow/login_redirect" : "https://api.vcttools.net/v1/rso_flow/login_redirect";
}

const openLogout = () => {

}

(async () => {
  const response = await fetch(import.meta.env.DEV ? "http://localhost/v1/account/account_info" : "https://api.vcttools.net/v1/account/account_info", {
    credentials: "include"
  });

  if (response.ok) {
    const data = await response.json();
    accountStatus.value = {
      loggedIn: true,
      gameName: data.riotGameName,
      tagline: data.riotTagLine,
      email: data.email
    };
  } else {
    accountStatus.value = {
      loggedIn: false,
      gameName: null,
      tagline: null,
      email: null
    };
  }
})();
</script>
