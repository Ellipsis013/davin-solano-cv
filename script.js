document.addEventListener('DOMContentLoaded', () => {
  const terminalInput = document.getElementById('terminal-input');

  terminalInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      const command = this.value.trim();
      if (command !== '') {
        processCommand(command);
        this.value = '';
      }
    }
  });
});

function focusInput() {
  document.getElementById('terminal-input').focus();
}

function toggleView() {
  document.body.classList.toggle('gui-mode');
  const btn = document.getElementById('toggle-view-btn');
  
  if (document.body.classList.contains('gui-mode')) {
    btn.innerHTML = '<i class="fa-solid fa-terminal"></i> Switch to Terminal View';
  } else {
    btn.innerHTML = '<i class="fa-solid fa-file-user"></i> Switch to Classic GUI View';
    setTimeout(focusInput, 100);
  }
}

function processCommand(cmd) {
  const outputContainer = document.getElementById('terminal-output');
  const cleanCmd = cmd.toLowerCase().trim();

  const outputDiv = document.createElement('div');
  outputDiv.className = 'command-output';
  outputDiv.innerHTML = `<div class="executed-line"><span class="prompt"><span class="user">davin</span>@<span class="host">portfolio</span>:<span class="path">~</span>$</span> ${escapeHTML(cmd)}</div>`;

  let responseHTML = '';

  switch (cleanCmd) {
    case 'help':
      responseHTML = `
        <p>Available commands:</p>
        <p>  <span class="highlight">summary</span>      - Background overview & degree</p>
        <p>  <span class="highlight">experience</span>   - Detailed career history with dates</p>
        <p>  <span class="highlight">skills</span>       - Programming languages & backend tech</p>
        <p>  <span class="highlight">education</span>    - Degree & university timeline</p>
        <p>  <span class="highlight">certs</span>        - Certifications, IDs & verification links</p>
        <p>  <span class="highlight">projects</span>     - Key backend projects & live links</p>
        <p>  <span class="highlight">contact</span>      - Email, phone, and LinkedIn</p>
        <p>  <span class="highlight">download</span>     - Download PDF Resume</p>
        <p>  <span class="highlight">gui</span>          - Switch to standard 1-page paper view</p>
        <p>  <span class="highlight">clear</span>        - Clear the terminal screen</p>
      `;
      break;

    case 'summary':
    case 'about':
      responseHTML = `
        <p><strong>Mel Davin Solano — Backend Developer</strong></p>
        <p>BS Computer Science graduate from UP Diliman (Jun 2013 – Jun 2018). Experienced in developing backend architecture, microservices, and enterprise automation using Node.js, Express, Ruby on Rails, and ServiceNow.</p>
      `;
      break;

    case 'experience':
    case 'history':
    case 'jobs':
      responseHTML = `
        <p><strong>Work Experience:</strong></p>
        <br>
        <p>• <strong>Backend Developer</strong> @ Sysplex IT Solutions <span style="color:#8b949e;">[Sep 2023 – Dec 2023]</span></p>
        <p>  Engineered server architecture & relational database query logic.</p>
        <br>
        <p>• <strong>ServiceNow Developer</strong> @ GECO Asia <span style="color:#8b949e;">[Sep 2022 – Mar 2023]</span></p>
        <p>  Built platform client scripts, business rules, & workflow automations.</p>
        <br>
        <p>• <strong>Developer</strong> @ Podcast Network Asia (Podmachine) <span style="color:#8b949e;">[Jan 2022 – Jun 2022]</span></p>
        <p>  Built audio processing pipelines & backend API integrations.</p>
        <br>
        <p>• <strong>Full Stack Developer</strong> @ CloudSwyft Global Systems <span style="color:#8b949e;">[Jul 2021 – Oct 2021]</span></p>
        <p>  Integrated cloud lab provisioning & LMS backend services.</p>
        <br>
        <p>• <strong>Junior Analyst</strong> @ Technomancer (Quantagoods) <span style="color:#8b949e;">[Jan 2021 – Jun 2021]</span></p>
        <p>  Designed relational SQL schemas & inventory backend workflows.</p>
        <br>
        <p>• <strong>Software Developer</strong> @ Monstronauts Inc <span style="color:#8b949e;">[Mar 2020 – Sep 2020]</span></p>
        <p>  Maintained game server logic handlers & internal backend tooling.</p>
        <br>
        <p>• <strong>Backend Developer</strong> @ Supergene Global Services <span style="color:#8b949e;">[Feb 2018 – Feb 2020]</span></p>
        <p>  Engineered Facebook Instant Game APIs supporting 1M+ daily users.</p>
      `;
      break;

    case 'skills':
      responseHTML = `
        <p><strong>Technical Skills:</strong></p>
        <p>• <strong>Languages:</strong> JavaScript (ES6+), C, C#, Ruby</p>
        <p>• <strong>Backend & Frameworks:</strong> Node.js, Express.js, Ruby on Rails, ServiceNow Scripting</p>
        <p>• <strong>Databases & Tools:</strong> MongoDB, SQL, Git, RESTful APIs</p>
      `;
      break;

    case 'education':
      responseHTML = `
        <p><strong>Education:</strong></p>
        <p>• <strong>Bachelor of Science in Computer Science</strong> <span style="color:#8b949e;">[Jun 2013 – Jun 2018]</span></p>
        <p>  University of the Philippines Diliman</p>
      `;
      break;

    case 'certs':
    case 'certificates':
    case 'certifications':
      responseHTML = `
        <p><strong>Certifications & Credentials:</strong></p>
        <br>
        <p>• <strong>Data Science Certificate</strong> — CloudSwyft Global Systems <span style="color:#8b949e;">[Jul 2021 · No Expiration]</span></p>
        <p>  Credential ID: <span style="color:#00ff66;">acc.N1b4nT98</span></p>
        <p>  Verify Link: <a href="https://www.credential.net/ea65e257-7a69-430a-9d8f-86d3af6ed12b" target="_blank" rel="noreferrer">credential.net/ea65e257-7a69-430a-9d8f-86d3af6ed12b</a></p>
        <br>
        <p>• <strong>Ruby on Rails Certification</strong> — Alison <span style="color:#8b949e;">[2026 · No Expiration]</span></p>
        <p>  PDF Link 1: <a href="https://alison.com/user/pdf/1274/1" target="_blank" rel="noreferrer">alison.com/user/pdf/1274/1</a></p>
        <p>  PDF Link 2: <a href="https://alison.com/user/pdf/1249/1" target="_blank" rel="noreferrer">alison.com/user/pdf/1249/1</a></p>
        <br>
        <p>• <strong>ServiceNow Certified System Administrator (CSA)</strong> — ServiceNow <span style="color:#8b949e;">[Issued 2023 · No Expiration]</span></p>
        <p>  Profile: <a href="https://nowlearning.servicenow.com/" target="_blank" rel="noreferrer">nowlearning.servicenow.com</a></p>
      `;
      break;

    case 'projects':
      responseHTML = `
        <p><strong>Key Projects:</strong></p>
        <br>
        <p>1. <strong>Podmachine</strong> (Podcast Network Asia)</p>
        <p>   AI-powered podcast production platform. Engineered scalable API endpoints.</p>
        <p>   <a href="https://podmachine.com" target="_blank" rel="noreferrer">https://podmachine.com</a></p>
        <br>
        <p>2. <strong>Quantagoods</strong> (Technomancer)</p>
        <p>   E-commerce logistics platform. Built relational database schemas and order flows.</p>
        <p>   <a href="https://quantagoods.com" target="_blank" rel="noreferrer">https://quantagoods.com</a></p>
        <br>
        <p>3. <strong>CloudSwyft Academy</strong> (CloudSwyft Global Systems)</p>
        <p>   EdTech LMS backend integration and authentication services.</p>
        <p>   <a href="https://cloudswyft.com" target="_blank" rel="noreferrer">https://cloudswyft.com</a></p>
        <br>
        <p>4. <strong>Facebook OMG Quiz App</strong> (Supergene Global Services)</p>
        <p>   High-concurrency instant game API supporting millions of daily users.</p>
        <p>   <a href="https://facebook.com/omginstantgame/" target="_blank" rel="noreferrer">https://facebook.com/omginstantgame/</a></p>
      `;
      break;

    case 'contact':
      responseHTML = `
        <p><strong>Contact Information:</strong></p>
        <p>• Email: <a href="mailto:davinsolano@gmail.com">davinsolano@gmail.com</a></p>
        <p>• Phone: <a href="tel:+639063483143">+63 906-348-3143</a></p>
        <p>• LinkedIn: <a href="https://linkedin.com/in/davin-solano-bab360112" target="_blank" rel="noreferrer">linkedin.com/in/davin-solano-bab360112</a></p>
      `;
      break;

    case 'gui':
    case 'classic':
    case 'mode':
      toggleView();
      responseHTML = `<p>Switched display mode.</p>`;
      break;

    case 'download':
    case 'resume':
    case 'pdf':
      const link = document.createElement('a');
      link.href = '/resume.pdf';
      link.download = 'Mel_Davin_Solano_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      responseHTML = `<p class="highlight">Downloading resume... If the download doesn't start automatically, <a href="/resume.pdf" download="Mel_Davin_Solano_Resume.pdf">click here</a>.</p>`;
      break;

    case 'clear':
      outputContainer.innerHTML = '';
      return;

    default:
      responseHTML = `<p>Command not recognized: '<span style="color:#ff5f56;">${escapeHTML(cmd)}</span>'. Type <span class="highlight">'help'</span> for available commands.</p>`;
  }

  outputDiv.innerHTML += responseHTML;
  outputContainer.appendChild(outputDiv);

  const terminalBody = document.getElementById('terminal-body');
  terminalBody.scrollTop = terminalBody.scrollHeight;
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}