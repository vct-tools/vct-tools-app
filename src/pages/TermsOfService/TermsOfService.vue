<template>
  <div class="container">
    <header-container pageName="Terms of Service">
      <div class="about-body">
        <p>Download: <a href="/documents/terms_of_service_v1.txt">terms_of_service_v1.txt</a></p>
        <HeaderSmall>VCT Tools Terms of Service</HeaderSmall>
        <p>Version 1, Last Updated: 07/02/2025</p>

        <p>
          Welcome to VCT Tools ("VCT Tools", "we", "us", or "our"). By accessing the vcttools.net
          website ("Website", or "Services"), you agree to comply with and be bound by these Terms
          of Service ("Terms"). If you do not agree to these Terms, you may not use our Services.
        </p>

        <HeaderSmall>Table of Contents</HeaderSmall>
        <ol>
          <li>Acceptance of Terms</li>
          <li>Use of Services</li>
          <ol>
            <li>Eligibility</li>
            <li>Account Registration</li>
            <li>Acceptable Use</li>
          </ol>
          <li>Data Collection and Privacy</li>
          <li>Service Availability and Modifications</li>
          <li>Intellectual Property</li>
          <li>Termination</li>
          <li>Disclaimers and Limitation of Liability</li>
          <li>Governing Law and Dispute Resolution</li>
          <li>Updates to Terms</li>
          <li>Contact Information</li>
        </ol>

        <HeaderSmall>1. Acceptance of Terms</HeaderSmall>
        <ul>
          <li>
            These terms constitute a legally binding agreement between you ("User", "you", or
            "your") and VCT Tools ("VCT Tools", "we", "us", or "our").
          </li>
          <li>
            If you are using the Services on behalf of a business or legal entity, you represent
            that you have the authority to bind that entity to these Terms.
          </li>
        </ul>

        <HeaderSmall>2. Use of Services</HeaderSmall>
        <HeaderSmall>2.1 Eligibility</HeaderSmall>
        <ul>
          <li>You must be at least 13 years of age to use the Services.</li>
          <li>You may not use the Services if prohibited by applicable laws.</li>
        </ul>

        <HeaderSmall>2.2 Account Registration</HeaderSmall>
        <ul>
          <li>To access certain features, you must sign in using Riot Sign On ("RSO").</li>
          <li>
            You are responsible for maintaining the confidentiality of your account credentials.
          </li>
        </ul>

        <HeaderSmall>2.3 Acceptable Use</HeaderSmall>
        <ul>
          <li>You agree not to:</li>
          <ul>
            <li>Use the Services for illegal or unauthorized purposes.</li>
            <li>Attempt to reverse-engineer, modify, or disrupt the Services.</li>
            <li>Exploit security vulnerabilities or interfere with the Services' operations.</li>
            <li>Engage in automated data scraping, extraction, or similar activities.</li>
          </ul>
        </ul>

        <HeaderSmall>3. Data Collection and Privacy</HeaderSmall>
        <ul>
          <li>
            Our Privacy Policy (<a href="https://vcttools.net/privacy"
              >https://vcttools.net/privacy</a
            >) governs how we collect, use, and protect your data.
          </li>
          <li>
            By using the services, you acknowledge and consent to our data collection practices.
          </li>
        </ul>

        <HeaderSmall>4. Service Availability and Modifications</HeaderSmall>
        <ul>
          <li>
            We reserve the right to modify, suspend, or discontinue the Services at any time without
            notice.
          </li>
          <li>
            We are not liable for any disruptions, losses, or damages resulting from service
            downtime.
          </li>
        </ul>

        <HeaderSmall>5. Intellectual Property</HeaderSmall>
        <ul>
          <li>
            The Services were created under Riot Games' "Legal Jibber Jabber" policy (<a
              href="https://www.riotgames.com/en/legal"
              >https://www.riotgames.com/en/legal</a
            >) using assets owned by Riot Games. Riot Games does not endorse or sponsor this
            project.
          </li>
          <li>
            All original content created by VCT Tools, including but not limited to software code,
            user interface design, and analytics tools, remains the exclusive property of VCT Tools.
          </li>
          <li>
            If users submit any content through the Services, they retain ownership but grant VCT
            Tools a non-exclusive, worldwide, royalty-free license to use, modify, and display such
            content for the operation of the Services.
          </li>
          <li>
            Users are not permitted to erase or hide any branding or watermarks placed on content
            produced by Apps unless they are permitted to do so via our subscriptions.
          </li>
        </ul>

        <HeaderSmall>6. Termination</HeaderSmall>
        <ul>
          <li>
            We reserve the right to suspend or terminate your access to the Services if you violate
            these Terms.
          </li>
          <li>Upon termination, you lose access to your account and stored data.</li>
        </ul>

        <HeaderSmall>7. Disclaimers and Limitation of Liability</HeaderSmall>
        <ul>
          <li>
            The Services are provided "as is" and "as available" without warranties of any kind.
          </li>
          <li>
            We are not responsible for any damages, data loss, or security breaches arising from
            your use of the Services.
          </li>
          <li>
            We do not guarantee the accuracy or availability of third-party data (e.g., Riot Games
            API data).
          </li>
        </ul>

        <HeaderSmall>8. Governing Law and Dispute Resolution</HeaderSmall>
        <ul>
          <li>These Terms are governed by the laws of Queensland, Australia.</li>
          <li>
            Any disputes shall be resolved through arbitration or courts in Brisbane, Australia.
          </li>
        </ul>

        <HeaderSmall>9. Updates to Terms</HeaderSmall>
        <ul>
          <li>
            We may update these Terms at any time. The latest version will always be available on
            our website.
          </li>
          <li>If changes are significant, we will notify users via email or a website notice.</li>
        </ul>

        <HeaderSmall>10. Contact Information</HeaderSmall>
        <ul>
          <li>
            For questions or concerns regarding these Terms, contact us at
            "contact[at]vcttools[dot]net".
          </li>
        </ul>

        <p>
          By using VCT Tools, you acknowledge that you have read, understood, and agreed to these
          Terms of Service.
        </p>
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
