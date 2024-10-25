---
layout: viewall
title: "Android Install Helper"
prompt: ""
keywords: ""
date:   2024-10-24 17:01:19
author: "blockarchitech"
hideFirstStepNumber: true
osSpecific: true
os: android
---

# Android Install Helper

This tool will guide you through the process of installing the Pebble app on your Android 13+ device.

<nodesktop>
  <alert>
    <strong>Important:</strong> This guide is not compatible with your device. Please use a computer running Google Chrome to install the Pebble app, or use the <a href="/apk-load-android">manual installation guide</a>.
  </alert>
</nodesktop>
<div class="timeline">
  <div class="step active">
    <div class="step-circle">1</div>
    <div class="step-content">
      <h2>Connect your phone</h2>
      <ol>
        <li>Connect your phone to your computer with a USB cable.</li>
        <li>
          Enable USB debugging on your phone.
          <ul>
            <li>Go to Settings > About phone > Software information.</li>
            <li>Tap "Build number" seven times.</li>
            <li>Go back to the main settings screen and tap "Developer options".</li>
            <li>Enable "USB debugging".</li>
          </ul>
        </li>
        <li>Click the button below to connect your device. Follow prompts from your browser.</li>
      </ol>
      <button class="mt-5 highlight" id="connect">Connect <i class="fas fa-link"></i></button>
    </div>
  </div>
  <div class="line"></div>
  <div class="step upcoming">
    <div class="step-circle">2</div>
    <div class="step-content">
      <h2>Begin Installation</h2>
      <p>Once you click the button below, we'll start the installation process on your phone. <em>Do not disconnect your phone during this process. Keep your phone awake during the process.</em></p>
      <p id="status_text"></p>
      <button class="mt-5 previousstep highlight" id="install"> Install <i class="fas fa-download"></i></button>
    </div>
  </div>
  <div class="line"></div>
  <div class="step upcoming">
    <div class="step-circle">3</div>
    <div class="step-content">
      <h2>All done!</h2>
      <a href="/setup-android">Continue with the Android setup guide.</a><br />
      <img width="200" height="200" style="border:0;" src="{{ site.baseurl }}/images/setup/13.png">
    </div>
  </div>
</div>
<script src="{{ site.baseurl }}/res/js/adb.js"></script>
<script src="{{ site.baseurl }}/res/js/androidInstaller.js"></script>
