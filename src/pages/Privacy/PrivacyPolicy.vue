<template>
  <div class="container">
    <header-container pageName="Privacy Policy">
      <div class="about-body">
        <p>Download: <a href="/documents/privacy_policy_v1.txt">privacy_policy_v1.txt</a></p>
        <HeaderSmall>VCT Tools Privacy Policy</HeaderSmall>
        <p>Version 1, Last Updated: 07/02/2025</p>
        <p>We respect your privacy and are committed to protecting it. This Privacy Policy ("Policy") describes the type of information we may collect from you or that you may provide ("Personal Information") on the VCT Tools (vcttools.net) website ("Website" or "Service").</p>
        <p>This Policy is a legally binding agreement between you ("User", "you", or "your") and VCT Tools ("VCT Tools", "we", "us", or "our"). If you are entering into this Policy on behalf of a business or other legal entity, you represent that you have the authority to bind such entity to this Policy, in which case the terms "User", "you", or "your" shall refer to such entity. If you do not have such authority, or if you disagree with the terms of this Policy, you must not accept this Policy and may not access and use the Website and Services. By accessing and using the Website and Services, you acknowledge that you have read, understood, and agree to be bound by the terms of this Policy. This Policy does not apply to the practices of companies that we do not own or control, or to individuals that we do not employ or manage.</p>
        <p>
          This website uses third-party services with their Privacy Policies. The following parties may collect data in accordance with the related Privacy Policies.
        </p>
        <ul>
          <li>Riot Games (<a href="https://www.riotgames.com/en/privacy-notice">https://www.riotgames.com/en/privacy-notice</a>)</li>
          <li>Google (<a href="https://policies.google.com/privacy">https://policies.google.com/privacy</a>)</li>
        </ul>
        <HeaderSmall>Table of Contents</HeaderSmall>
        <ol>
          <li>Personal information we collect</li>
          <ol>
            <li>Data provided by third-parties</li>
            <li>Data we collect</li>
          </ol>
          <li>Data we disclose</li>
          <ol>
            <li>Data requests</li>
          </ol>
          <li>Security Measures</li>
          <li>Data Retention</li>
          <li>User Rights</li>
          <ol>
            <li>Data removal</li>
            <li>Opt Out</li>
          </ol>
          <li>Updates</li>
          <li>Contact Information</li>
        </ol>
        <HeaderSmall>1. Personal information we collect</HeaderSmall>
        <p>We collect personal information in two ways:</p>
        <ul>
          <li>You provide the information to inputs on the website</li>
          <li>When you sign into the website using Riot Sign On ("RSO"), or from other third parties (See 1.1)</li>
        </ul>
        <HeaderSmall>1.1 Data provided by third-parties</HeaderSmall>
        <p>When you sign in to the website using RSO, Riot Games provides the website with information about your account, such as your username and email.</p>
        <HeaderSmall>1.2 Data we collect</HeaderSmall>
        <p>When you sign in to the website, we keep a record of your Riot account identifier and an email contact. We also use information from your VALORANT account, including your matches, for use in VCT Tools apps ("Apps").</p>
        <HeaderSmall>2. Data we disclose</HeaderSmall>
        <p>We will never disclose your personal information to the public, however, data such as VALORANT matches will be able to be seen by others through apps if you accept the policy.</p>
        <HeaderSmall>2.1 Data requests</HeaderSmall>
        <p>We will return you a copy of all personal information we have collected if you wish to view it.</p>
        <HeaderSmall>3. Security Measures</HeaderSmall>
        <p>Your data requires your authorization to access. Your data is secured in transit using the HTTPS protocol, and sensitive information is hashed or encrypted.</p>
        <HeaderSmall>4. Data Retention</HeaderSmall>
        <p>User data is kept for the duration of your VCT Tools account (created when you log in with RSO) lifetime. If you request an account deletion from the website, your data will be deleted alongside your account, immediately.</p>
        <HeaderSmall>5. User Rights</HeaderSmall>
        <HeaderSmall>5.1 Data removal</HeaderSmall>
        <p>To delete collected data, you are required to delete your VCT Tools account (See Data Retention).</p>
        <HeaderSmall>5.2 Opt Out</HeaderSmall>
        <p>We only collect data that is completely necessary for the website to function, and it is not possible to opt out of data collection.</p>
        <HeaderSmall>6. Updates</HeaderSmall>
        <p>This policy is subject to change. In the case that the policy does change, an email notification will be sent to your email contact that is collected when your account is made. A notice will also be available on the website.</p>
        <HeaderSmall>7. Contact Information</HeaderSmall>
        <p>You can email "contact@vcttools.net" for questions or concerns regarding the Policy.</p>
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

.about-body {
  width: 50vw;
  height: fit-content;
  padding: 5px 1em;
  font-size: 12pt;

  border: 1px solid #6b7476;

  user-select: text !important;
}
</style>

<script setup lang="ts">
import HeaderContainer from "@/components/HeaderContainer.vue";
import HeaderSmall from "@/components/HeaderSmall.vue";
</script>
