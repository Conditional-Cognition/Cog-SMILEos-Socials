const subTitleText = document.getElementById('sub-title-text');
const subIcon = document.getElementById('sub-icon');
const screenContent = document.getElementById('screen-content');
const leftPane = document.querySelector('.left-pane');

const leftPaneDefaultHTML = leftPane.innerHTML;

leftPane.addEventListener('click', (e) => {
    const button = e.target.closest('.os-button');
    if (button) {
        const target = button.getAttribute('data-target');

        // Redirecting the enemies panel to display your socials matrix
        if (target === 'enemies') renderSocialsScreen();
        return;
    }

    const brand = e.target.closest('.brand-area');
    if (brand) brand.classList.toggle('showing-image');
});

document.getElementById('main-close-btn').addEventListener('click', () => location.reload());

// Forces the socials grid to load automatically at startup
window.addEventListener('load', () => {
    renderSocialsScreen();
});

function renderSocialsScreen(activeKey = null) {
    const realSlots = Object.keys(socialData).map(key => `
        <button class="enemy-grid-btn${key === activeKey ? ' active-tab' : ''}"
                style="background-image: url('${socialData[key].image}')"
                data-enemy="${key}"
                aria-label="${socialData[key].name}">
        </button>
    `).join('');

    const lockedSlots = Array(2).fill('<div class="enemy-grid-locked">?</div>').join('');

    subIcon.innerHTML = `<img src="assets/SmileOS_2_icon_enemy.svg" style="width: 16px; height: 16px;" alt="enemy icon">`;
    subTitleText.textContent = 'Socials';

    screenContent.classList.add('top-anchored');
    screenContent.innerHTML = `<div class="enemy-grid">${realSlots}${lockedSlots}</div>`;
    leftPane.innerHTML = leftPaneDefaultHTML;

    screenContent.querySelectorAll('.enemy-grid-btn').forEach(btn => {
        btn.addEventListener('click', () => renderSocialDetail(btn.dataset.enemy));
    });
}

function renderSocialDetail(key) {
    const enemy = socialData[key];
    if (!enemy) return;

    subIcon.innerHTML = `<img src="assets/SmileOS_2_icon_info.png" style="width: 16px; height: 16px;" alt="info icon">`;
    subTitleText.textContent = 'Social Data';

    let mediaContentHTML = '';
    if (enemy.type === 'both') {
        mediaContentHTML = `
            <a class="enemy-link" href="${enemy.url}" target="_blank" rel="noopener">${enemy.url}</a>
            <p style="height: 15px"></p>
            <button class="image-preview-btn" id="open-attachment-btn" style="background: none; border: none; padding: 0; cursor: pointer; width: 100%; text-align: left;">
                <img class="enemy-detail-image" src="assets/personal/${enemy.picture}" alt="${enemy.name} attachment" style="max-width: 100%; height: auto; display: block; margin-top: 10px;">
            </button>
        `;
    } else if (enemy.type === 'picture') {
        mediaContentHTML = `
            <button class="image-preview-btn" id="open-attachment-btn" style="background: none; border: none; padding: 0; cursor: pointer; width: 100%; text-align: left;">
                <img class="enemy-detail-image" src="assets/personal/${enemy.picture}" alt="${enemy.name} attachment" style="max-width: 100%; height: auto; display: block; margin-top: 10px;">
            </button>
        `;
    } else if (enemy.type === 'url') {
        mediaContentHTML = `
            <a class="enemy-link" href="${enemy.url}" target="_blank" rel="noopener">${enemy.url}</a>
        `;
    }

    screenContent.innerHTML = `
        <div class="enemy-detail-wrapper">
            <div class="enemy-detail-page">
                <div class='enemy-display'>
                    <img class="enemy-detail-image" src="${enemy.image}" alt="">
                    <p class="highlight-white">${enemy.name}</p> 
                    <button class="enemy-back-btn" id="enemy-back-btn">Back</button>
                </div>
                <div class="enemy-detail-panel">
                    <div class="enemy-text">
                        <p class="highlight-red">DESCRIPTION:</p>
                        <p class="screen-text">${enemy.description}</p>
                        <p class="highlight-red">ACCESS:</p>
                        <p class="screen-text">${enemy.access || ''}</p>
                        <p style="height: 15px"></p>
                        ${mediaContentHTML}
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('enemy-back-btn').addEventListener('click', () => renderSocialsScreen(key));

    const attachmentBtn = document.getElementById('open-attachment-btn');
    if (attachmentBtn) {
        attachmentBtn.addEventListener('click', () => renderSocialImageView(key));
    }
}

function renderSocialImageView(key) {
    const enemy = socialData[key];
    if (!enemy) return;

    subIcon.innerHTML = `<img src="assets/SmileOS_2_icon_info.png" style="width: 16px; height: 16px;" alt="information icon">`;
    subTitleText.textContent = `${enemy.name} - Attachment`;

    screenContent.innerHTML = `
        <div class="enemy-detail-wrapper" style="padding: 10px; box-sizing: border-box; justify-content: space-between;">
            <div style="flex: 1; display: flex; align-items: center; justify-content: center; overflow-y: auto; padding-bottom: 10px;">
                <img src="assets/personal/${enemy.picture}" alt="${enemy.name} full view" style="max-width: 100%; max-height: 290px; object-fit: contain;">
            </div>
            <button class="image-back-btn" id="image-view-back-btn" style="width: fit-content; align-self: flex-start;">Back</button>
        </div>
    `;

    document.getElementById('image-view-back-btn').addEventListener('click', () => renderSocialDetail(key));
}

const socialData = {
    example: {
        name: 'EXAMPLE',
        type: 'both',
        url: 'https://spinningrat.online/',
        picture: 'PUT-PICTURES-HERE.png',
        image: 'assets/socials/PUT-ICONS-HERE.png',
        description: 'HOW TO USE\n\ngo to this website\'s normal github link, and copy the thingo however you do, and edit the files to your liking to make your own SmileOS 2.0 socials page.',
        access: 'When adding a socials entry, leave either \'picture\' or \'url\' blank if you dont want them.\n\nEverything else should be at least something, but it doesnt have to be :)'
    }
};