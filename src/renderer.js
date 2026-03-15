const radios = document.querySelectorAll('input[name="over18"]');
const ageGroup = document.getElementById('age-group');
const ageSelect = document.getElementById('age-select');
const saveBtn = document.getElementById('save-btn');

let savedState = { over18: null, age: null };
let dirty = false;

function markDirty() {
  dirty = true;
}

function getCurrentState() {
  const checked = document.querySelector('input[name="over18"]:checked');
  if (!checked) return null;
  const state = { Over18: checked.value === 'over' ? 'true' : 'false' };
  if (checked.value === 'under' && ageSelect.value) {
    state.age = ageSelect.value;
  }
  return state;
}

function isDirty() {
  const current = getCurrentState();
  if (!current && !savedState.over18) return false;
  if (!current || !savedState.over18) return dirty;
  if (current.Over18 !== savedState.Over18) return true;
  if (current.Over18 === 'false' && current.age !== savedState.age) return true;
  return false;
}

async function save() {
  const data = getCurrentState();
  if (!data) return;
  await window.api.saveAge(data);
  savedState = { ...data };
  dirty = false;
}

// Radio button change
radios.forEach((radio) => {
  radio.addEventListener('change', () => {
    if (radio.value === 'under') {
      ageGroup.classList.remove('hidden');
    } else {
      ageGroup.classList.add('hidden');
      ageSelect.value = '';
    }
    markDirty();
  });
});

// Dropdown change
ageSelect.addEventListener('change', markDirty);

// Save button
saveBtn.addEventListener('click', save);

// Menu Save
window.api.onMenuSave(save);

// Exit dirty check
window.api.onCheckDirty(async () => {
  if (isDirty()) {
    const confirmed = confirm('You have unsaved changes. Discard and exit?');
    if (confirmed) {
      window.api.sendDirtyState(false);
    }
  } else {
    window.api.sendDirtyState(false);
  }
});

// Load existing .age file on startup
(async () => {
  const data = await window.api.loadAge();
  if (!data) return;

  if (data.Over18 === 'true') {
    document.querySelector('input[value="over"]').checked = true;
    savedState = { Over18: 'true' };
  } else if (data.Over18 === 'false') {
    document.querySelector('input[value="under"]').checked = true;
    ageGroup.classList.remove('hidden');
    savedState = { Over18: 'false' };
    if (data.age) {
      ageSelect.value = data.age;
      savedState.age = data.age;
    }
  }
})();
