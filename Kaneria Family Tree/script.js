const STORAGE_KEY = 'kaneriaFamilyTreeData';
const THEME_KEY = 'kaneriaFamilyTreeTheme';

const sampleData = [
  {
    id: 1,
    familyId: 'F1',
    fullName: 'Gopal Kaneria',
    gender: 'Male',
    birthDate: '1960-05-15',
    photos: [],
    phoneNumber: '+91-98765-43210',
    email: 'gopal@kaneria.com',
    birthPlace: 'Ahmedabad, India',
    currentCity: 'Ahmedabad, India',
    occupation: 'Retired Business Owner',
    education: 'B.Comm, Ahmedabad University',
    fatherId: null,
    motherId: null,
    spouseId: 2,
    notes: 'Family elder and advisor.'
  },
  {
    id: 2,
    familyId: 'F1',
    fullName: 'Asha Kaneria',
    gender: 'Female',
    birthDate: '1962-08-22',
    photos: [],
    phoneNumber: '+91-98765-43211',
    email: 'asha@kaneria.com',
    birthPlace: 'Mumbai, India',
    currentCity: 'Ahmedabad, India',
    occupation: 'Homemaker',
    education: 'B.A, Mumbai University',
    fatherId: null,
    motherId: null,
    spouseId: 1,
    notes: 'Loves family gatherings and cooking.'
  },
  {
    id: 3,
    familyId: 'F1',
    fullName: 'Shashank Kaneria',
    gender: 'Male',
    birthDate: '1985-03-10',
    photos: [],
    phoneNumber: '+91-98765-43212',
    email: 'shashank@kaneria.com',
    birthPlace: 'Ahmedabad, India',
    currentCity: 'Bangalore, India',
    occupation: 'Software Engineer',
    education: 'B.Tech, IIT Delhi',
    fatherId: 1,
    motherId: 2,
    spouseId: 5,
    notes: 'Software engineer and father of the younger generation.'
  },
  {
    id: 4,
    familyId: 'F1',
    fullName: 'Deepshikha Kaneria',
    gender: 'Female',
    birthDate: '1987-11-05',
    photos: [],
    phoneNumber: '+91-98765-43213',
    email: 'deepshikha@kaneria.com',
    birthPlace: 'Ahmedabad, India',
    currentCity: 'Mumbai, India',
    occupation: 'Education Consultant',
    education: 'M.A, Delhi University',
    fatherId: 1,
    motherId: 2,
    spouseId: null,
    notes: 'Passionate about education and family history.'
  },
  {
    id: 5,
    familyId: 'F1',
    fullName: 'Aditi Rathore',
    gender: 'Female',
    birthDate: '1986-07-18',
    photos: [],
    phoneNumber: '+91-98765-43214',
    email: 'aditi@rathore.com',
    birthPlace: 'Jaipur, India',
    currentCity: 'Bangalore, India',
    occupation: 'Graphic Designer',
    education: 'B.Design, NIFT Delhi',
    fatherId: null,
    motherId: null,
    spouseId: 3,
    notes: 'Creative designer and supportive partner.'
  },
  {
    id: 6,
    familyId: 'F1',
    fullName: 'Anirudh Kaneria',
    gender: 'Male',
    birthDate: '2010-02-14',
    photos: [],
    phoneNumber: '+91-98765-43215',
    email: '',
    birthPlace: 'Bangalore, India',
    currentCity: 'Bangalore, India',
    occupation: 'Student',
    education: 'Grade 10 (High School)',
    fatherId: 3,
    motherId: 5,
    spouseId: null,
    notes: 'The youngest member of the family tree.'
  },
  {
    id: 7,
    familyId: 'F2',
    fullName: 'Mohan Patel',
    gender: 'Male',
    birthDate: '1958-11-01',
    photos: [],
    phoneNumber: '+91-98765-43216',
    email: 'mohan@patel.com',
    birthPlace: 'Vadodara, India',
    currentCity: 'Vadodara, India',
    occupation: 'Retired Engineer',
    education: 'B.E, M.S University',
    fatherId: null,
    motherId: null,
    spouseId: 8,
    notes: 'Neighbor family branch example.'
  },
  {
    id: 8,
    familyId: 'F2',
    fullName: 'Seema Patel',
    gender: 'Female',
    birthDate: '1961-07-20',
    photos: [],
    phoneNumber: '+91-98765-43217',
    email: 'seema@patel.com',
    birthPlace: 'Surat, India',
    currentCity: 'Vadodara, India',
    occupation: 'Retired Teacher',
    education: 'B.Ed, Gujarat University',
    fatherId: null,
    motherId: null,
    spouseId: 7,
    notes: 'Represents another family branch.'
  }
];

let members = [];
let nextId = 1;
let nextFamilyNumber = 1;
let currentEditId = null;
let dragState = null;
let zoomLevel = 1;
let panX = 0;
let panY = 0;
let currentEditPhotos = [];
let currentPhotoIndex = 0;

const dom = {};

function $(id) {
  return document.getElementById(id);
}

function init() {
  dom.treeViewport = $('treeViewport');
  dom.treeCanvas = $('treeCanvas');
  dom.searchInput = $('searchInput');
  dom.branchFilter = $('branchFilter');
  dom.zoomRange = $('zoomRange');
  dom.zoomValue = $('zoomValue');
  dom.modeToggle = $('modeToggle');
  dom.memberModal = $('memberModal');
  dom.memberForm = $('memberForm');
  dom.modalTitle = $('modalTitle');
  dom.fullNameInput = $('fullName');
  dom.genderInput = $('gender');
  dom.birthDateInput = $('birthDate');
  dom.familyIdInput = $('familyId');
  dom.fatherInput = $('fatherId');
  dom.motherInput = $('motherId');
  dom.spouseInput = $('spouseId');
  dom.phoneNumberInput = $('phoneNumber');
  dom.emailInput = $('email');
  dom.birthPlaceInput = $('birthPlace');
  dom.currentCityInput = $('currentCity');
  dom.occupationInput = $('occupation');
  dom.educationInput = $('education');
  dom.photosInput = $('photos');
  dom.photosGallery = $('photosGallery');
  dom.notesInput = $('notes');
  dom.exportJsonBtn = $('exportJsonBtn');
  dom.importJsonInput = $('importJsonInput');
  dom.generateFinalBtn = $('generateFinalBtn');
  dom.newFamilyIdBtn = $('newFamilyIdBtn');
  dom.printBtn = $('printBtn');
  dom.totalMembers = $('totalMembers');
  dom.totalBranches = $('totalBranches');
  dom.saveStatus = $('saveStatus');
  dom.saveMessage = $('saveMessage');
  dom.searchForm = $('searchForm');

  bindEvents();
  loadData();
  applyStoredTheme();
  updateZoom(1);
  renderAll();
}

function bindEvents() {
  dom.searchInput.addEventListener('input', renderAll);
  dom.branchFilter.addEventListener('change', renderAll);
  dom.zoomRange.addEventListener('input', ({ target }) => updateZoom(parseFloat(target.value)));
  dom.treeViewport.addEventListener('pointerdown', onViewportPointerDown);
  window.addEventListener('pointerup', onViewportPointerUp);
  window.addEventListener('pointermove', onViewportPointerMove);
  dom.modeToggle.addEventListener('click', toggleTheme);
  dom.memberForm.addEventListener('submit', handleMemberSubmit);
  $('openMemberBtn').addEventListener('click', () => openMemberModal());
  $('closeMemberModal').addEventListener('click', closeMemberModal);
  dom.photosInput.addEventListener('change', updatePhotosGallery);
  dom.exportJsonBtn.addEventListener('click', exportJson);
  dom.importJsonInput.addEventListener('change', importJson);
  $('openImportBtn').addEventListener('click', () => dom.importJsonInput.click());
  dom.generateFinalBtn.addEventListener('click', generateFinalPage);
  dom.newFamilyIdBtn.addEventListener('click', () => {
    dom.familyIdInput.value = generateFamilyId();
  });
  dom.printBtn.addEventListener('click', () => window.print());
  dom.treeCanvas.addEventListener('click', onTreeActionClick);
  $('searchForm').addEventListener('submit', event => event.preventDefault());
  dom.fatherInput.addEventListener('change', autoPopulateMother);
  dom.motherInput.addEventListener('change', autoPopulateFather);
}

function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      members = JSON.parse(saved);
    } else {
      members = sampleData.slice();
      // First time user - offer to load from saved JSON file
      setTimeout(() => {
        const shouldLoadJson = confirm('Welcome! Would you like to load your family tree from a previously saved JSON file?\n\nClick OK to select a file, or Cancel to start fresh with sample data.');
        if (shouldLoadJson) {
          dom.importJsonInput.click();
        }
      }, 500);
    }
  } catch (error) {
    console.warn('Failed to parse stored data, restoring sample dataset.', error);
    members = sampleData.slice();
  }

  nextId = Math.max(1, ...members.map(member => member.id || 0)) + 1;
  const familyNumbers = members
    .map(member => {
      const match = /^F(\d+)$/i.exec(member.familyId || '');
      return match ? parseInt(match[1], 10) : 0;
    })
    .filter(Boolean);
  nextFamilyNumber = familyNumbers.length ? Math.max(...familyNumbers) + 1 : 1;
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
  showSaveStatus('✓ Saved to local storage');
}

function showSaveStatus(message) {
  dom.saveMessage.textContent = message;
  dom.saveStatus.style.display = 'block';
  dom.saveStatus.classList.remove('fade-out');
  
  setTimeout(() => {
    dom.saveStatus.classList.add('fade-out');
    setTimeout(() => {
      dom.saveStatus.style.display = 'none';
    }, 300);
  }, 2500);
}

function applyStoredTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === 'dark') {
    document.body.classList.add('dark');
    dom.modeToggle.textContent = 'Light mode';
  } else {
    document.body.classList.remove('dark');
    dom.modeToggle.textContent = 'Dark mode';
  }
}

function toggleTheme() {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
  dom.modeToggle.textContent = isDark ? 'Light mode' : 'Dark mode';
}

function updateZoom(value) {
  zoomLevel = value;
  dom.zoomRange.value = value;
  dom.zoomValue.textContent = `${Math.round(value * 100)}%`;
  dom.treeCanvas.style.transform = `translate(calc(-50% + ${panX}px), calc(-50% + ${panY}px)) scale(${zoomLevel})`;
}

function onViewportPointerDown(event) {
  dragState = {
    x: event.clientX,
    y: event.clientY,
    panX,
    panY
  };
  dom.treeViewport.classList.add('dragging');
}

function onViewportPointerMove(event) {
  if (!dragState) return;
  panX = dragState.panX + event.clientX - dragState.x;
  panY = dragState.panY + event.clientY - dragState.y;
  dom.treeCanvas.style.transform = `translate(calc(-50% + ${panX}px), calc(-50% + ${panY}px)) scale(${zoomLevel})`;
}

function onViewportPointerUp() {
  if (!dragState) return;
  dragState = null;
  dom.treeViewport.classList.remove('dragging');
}

function openMemberModal(memberId = null) {
  currentEditId = memberId;
  dom.memberModal.classList.add('show');
  populateRelationSelects(memberId);
  if (memberId) {
    const member = getMember(memberId);
    if (!member) return;
    dom.modalTitle.textContent = 'Edit Family Member';
    dom.fullNameInput.value = member.fullName;
    dom.genderInput.value = member.gender;
    dom.birthDateInput.value = member.birthDate;
    dom.familyIdInput.value = member.familyId || generateFamilyId();
    dom.fatherInput.value = member.fatherId || '';
    dom.motherInput.value = member.motherId || '';
    dom.spouseInput.value = member.spouseId || '';
    dom.phoneNumberInput.value = member.phoneNumber || '';
    dom.emailInput.value = member.email || '';
    dom.birthPlaceInput.value = member.birthPlace || '';
    dom.currentCityInput.value = member.currentCity || '';
    dom.occupationInput.value = member.occupation || '';
    dom.educationInput.value = member.education || '';
    dom.notesInput.value = member.notes || '';
    renderPhotosGallery(member.photos || []);
    currentEditPhotos = (member.photos || []).slice();
  } else {
    currentEditId = null;
    dom.modalTitle.textContent = 'Add Family Member';
    dom.memberForm.reset();
    dom.familyIdInput.value = generateFamilyId();
    renderPhotosGallery([]);
    currentEditPhotos = [];
  }
}

function closeMemberModal() {
  dom.memberModal.classList.remove('show');
  dom.memberForm.reset();
  dom.photosGallery.innerHTML = '<div class="photo-placeholder">Photo gallery will appear here</div>';
  currentEditPhotos = [];
  currentPhotoIndex = 0;
}

function populateRelationSelects(currentId) {
  const options = members
    .filter(member => member.id !== currentId)
    .sort((a, b) => a.id - b.id)
    .map(member => `<option value="${member.id}">${member.fullName} (ID ${member.id}, ${member.familyId})</option>`)
    .join('');

  dom.fatherInput.innerHTML = '<option value="">No father</option>' + options;
  dom.motherInput.innerHTML = '<option value="">No mother</option>' + options;
  dom.spouseInput.innerHTML = '<option value="">No spouse</option>' + options;
}

function autoPopulateMother() {
  const fatherId = dom.fatherInput.value;
  if (!fatherId) return;

  const father = getMember(Number(fatherId));
  if (!father || !father.spouseId) return;

  const spouse = getMember(father.spouseId);
  if (!spouse || spouse.gender !== 'Female') return;

  // Only auto-populate if mother is not already set
  if (!dom.motherInput.value) {
    dom.motherInput.value = spouse.id;
  }
}

function autoPopulateFather() {
  const motherId = dom.motherInput.value;
  if (!motherId) return;

  const mother = getMember(Number(motherId));
  if (!mother || !mother.spouseId) return;

  const spouse = getMember(mother.spouseId);
  if (!spouse || spouse.gender !== 'Male') return;

  // Only auto-populate if father is not already set
  if (!dom.fatherInput.value) {
    dom.fatherInput.value = spouse.id;
  }
}

function updatePhotosGallery() {
  const files = Array.from(dom.photosInput.files);
  if (files.length === 0) {
    renderPhotosGallery(currentEditPhotos);
    return;
  }

  // Limit to 3 photos
  if (currentEditPhotos.length + files.length > 3) {
    alert('Maximum 3 photos allowed per person.');
    return;
  }

  let loadedCount = 0;
  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = () => {
      currentEditPhotos.push(reader.result);
      loadedCount++;
      if (loadedCount === files.length) {
        renderPhotosGallery(currentEditPhotos);
        dom.photosInput.value = '';
      }
    };
    reader.readAsDataURL(file);
  });
}

function renderPhotosGallery(photos) {
  currentPhotoIndex = 0;
  if (!photos || photos.length === 0) {
    dom.photosGallery.innerHTML = '<div class="photo-placeholder">No photos added yet. Upload up to 3 photos.</div>';
    return;
  }

  let html = '<div class="gallery-container">';
  html += `<img src="${photos[0]}" alt="Photo" class="gallery-photo">`;
  
  if (photos.length > 1) {
    html += '<button type="button" class="gallery-nav gallery-prev" onclick="prevPhoto()">❮</button>';
    html += '<button type="button" class="gallery-nav gallery-next" onclick="nextPhoto()">❯</button>';
  }
  
  html += '<div class="gallery-counter">' + (photos.length > 1 ? `1 / ${photos.length}` : '1 / 1') + '</div>';
  html += '<div class="gallery-thumbnails">';
  photos.forEach((photo, idx) => {
    html += `<img src="${photo}" alt="Thumb ${idx + 1}" class="gallery-thumb ${idx === 0 ? 'active' : ''}" onclick="setPhotoIndex(${idx})">`;
  });
  html += '</div>';
  html += '<button type="button" class="gallery-remove-btn" onclick="removeCurrentPhoto()">🗑️ Remove</button>';
  html += '</div>';
  
  dom.photosGallery.innerHTML = html;
}

function nextPhoto() {
  if (currentEditPhotos.length > 1) {
    currentPhotoIndex = (currentPhotoIndex + 1) % currentEditPhotos.length;
    updateGalleryDisplay();
  }
}

function prevPhoto() {
  if (currentEditPhotos.length > 1) {
    currentPhotoIndex = (currentPhotoIndex - 1 + currentEditPhotos.length) % currentEditPhotos.length;
    updateGalleryDisplay();
  }
}

function setPhotoIndex(idx) {
  currentPhotoIndex = idx;
  updateGalleryDisplay();
}

function removeCurrentPhoto() {
  if (currentEditPhotos.length > 0) {
    currentEditPhotos.splice(currentPhotoIndex, 1);
    if (currentPhotoIndex >= currentEditPhotos.length && currentPhotoIndex > 0) {
      currentPhotoIndex--;
    }
    renderPhotosGallery(currentEditPhotos);
  }
}

function updateGalleryDisplay() {
  const photos = currentEditPhotos;
  const imgElement = document.querySelector('.gallery-photo');
  const counterElement = document.querySelector('.gallery-counter');
  const thumbs = document.querySelectorAll('.gallery-thumb');
  
  if (imgElement) imgElement.src = photos[currentPhotoIndex];
  if (counterElement) counterElement.textContent = `${currentPhotoIndex + 1} / ${photos.length}`;
  thumbs.forEach((thumb, idx) => {
    thumb.classList.toggle('active', idx === currentPhotoIndex);
  });
}

function handleMemberSubmit(event) {
  event.preventDefault();

  const fullName = dom.fullNameInput.value.trim();
  const gender = dom.genderInput.value;
  const birthDate = dom.birthDateInput.value;
  let familyId = dom.familyIdInput.value.trim().toUpperCase();
  const fatherId = dom.fatherInput.value ? Number(dom.fatherInput.value) : null;
  const motherId = dom.motherInput.value ? Number(dom.motherInput.value) : null;
  const spouseId = dom.spouseInput.value ? Number(dom.spouseInput.value) : null;
  const phoneNumber = dom.phoneNumberInput.value.trim();
  const email = dom.emailInput.value.trim();
  const birthPlace = dom.birthPlaceInput.value.trim();
  const currentCity = dom.currentCityInput.value.trim();
  const occupation = dom.occupationInput.value.trim();
  const education = dom.educationInput.value.trim();
  const photos = currentEditPhotos.slice();
  const notes = dom.notesInput.value.trim();
  const currentId = currentEditId ? Number(currentEditId) : null;

  if (!fullName || !gender || !birthDate) {
    alert('Please fill in name, gender, and date of birth.');
    return;
  }

  if (!/^F\d+$/i.test(familyId)) {
    familyId = generateFamilyId();
  }

  if (members.some(member => member.familyId === familyId && member.id !== currentId)) {
    if (!currentId) {
      familyId = generateFamilyId();
    }
  }

  if (fatherId && motherId && fatherId === motherId) {
    alert('Father and mother cannot be the same person.');
    return;
  }

  if ((fatherId && spouseId && fatherId === spouseId) || (motherId && spouseId && motherId === spouseId)) {
    alert('A spouse cannot also be selected as a parent.');
    return;
  }

  if ((fatherId && fatherId === currentId) || (motherId && motherId === currentId) || (spouseId && spouseId === currentId)) {
    alert('A member cannot be linked to themselves.');
    return;
  }

  const existingSpouse = spouseId ? getMember(spouseId) : null;
  if (existingSpouse && existingSpouse.spouseId && existingSpouse.spouseId !== currentEditId) {
    const confirmOverride = confirm(`${existingSpouse.fullName} is already married to another member. Replace the existing spouse relationship?`);
    if (!confirmOverride) {
      return;
    }
  }

  if (currentEditId) {
    const member = getMember(currentEditId);
    member.fullName = fullName;
    member.gender = gender;
    member.birthDate = birthDate;
    member.familyId = familyId;
    member.fatherId = fatherId;
    member.motherId = motherId;
    member.spouseId = spouseId;
    member.phoneNumber = phoneNumber;
    member.email = email;
    member.birthPlace = birthPlace;
    member.currentCity = currentCity;
    member.occupation = occupation;
    member.education = education;
    member.photos = photos;
    member.notes = notes;
    normalizeRelationships(member);
  } else {
    const newMember = {
      id: nextId++,
      familyId: familyId || generateFamilyId(),
      fullName,
      gender,
      birthDate,
      photos,
      phoneNumber,
      email,
      birthPlace,
      currentCity,
      occupation,
      education,
      fatherId,
      motherId,
      spouseId,
      notes
    };
    members.push(newMember);
    normalizeRelationships(newMember);
  }

  syncSpouseLinks();
  saveData();
  panX = 0;
  panY = 0;
  updateZoom(zoomLevel);
  renderAll();
  closeMemberModal();
}

function normalizeRelationships(member) {
  if (member.spouseId) {
    const spouse = getMember(member.spouseId);
    if (spouse) {
      spouse.spouseId = member.id;
    }
  }
  members.forEach(person => {
    if (person.spouseId === member.id && member.spouseId !== person.id) {
      person.spouseId = null;
    }
  });
}

function syncSpouseLinks() {
  members.forEach(person => {
    if (person.spouseId) {
      const spouse = getMember(person.spouseId);
      if (spouse && spouse.spouseId !== person.id) {
        spouse.spouseId = person.id;
      }
    }
  });
}

function getMember(id) {
  return members.find(member => member.id === Number(id));
}

function getChildren(parentId) {
  return members.filter(member => member.fatherId === parentId || member.motherId === parentId);
}

function generateFamilyId() {
  const newId = `F${nextFamilyNumber}`;
  nextFamilyNumber += 1;
  return newId;
}

function renderAll() {
  renderBranchFilter();
  renderStats();
  renderTree();
}

function renderBranchFilter() {
  const branchIds = Array.from(new Set(members.map(member => member.familyId).filter(Boolean))).sort((a, b) => {
    const aNum = Number(a.replace(/[^\d]/g, '')) || 0;
    const bNum = Number(b.replace(/[^\d]/g, '')) || 0;
    return aNum - bNum;
  });
  const currentValue = dom.branchFilter.value;
  const options = ['<option value="">All branches</option>', ...branchIds.map(id => `<option value="${id}">${id}</option>`)];
  dom.branchFilter.innerHTML = options.join('');
  if (branchIds.includes(currentValue)) {
    dom.branchFilter.value = currentValue;
  }
}

function renderStats() {
  dom.totalMembers.textContent = members.length;
  dom.totalBranches.textContent = Array.from(new Set(members.map(member => member.familyId))).length;
}

function renderTree() {
  const query = dom.searchInput.value.trim().toLowerCase();
  const branchFilter = dom.branchFilter.value;
  let visibleMembers = members.slice();
  if (branchFilter) {
    visibleMembers = visibleMembers.filter(member => member.familyId === branchFilter);
  }
  if (query) {
    visibleMembers = visibleMembers.filter(member => member.fullName.toLowerCase().includes(query) || String(member.id).includes(query) || (member.familyId || '').toLowerCase().includes(query));
  }

  if (!visibleMembers.length) {
    dom.treeCanvas.innerHTML = '<div class="tree-empty">No members match the current search or branch selection. Add a member or reset your filters.</div>';
    return;
  }

  let rootMembers = visibleMembers.filter(member => !member.fatherId && !member.motherId);
  if (!rootMembers.length) {
    rootMembers = visibleMembers.slice();
  }

  const rendered = rootMembers
    .filter(member => !member.spouseId || member.id < member.spouseId || !visibleMembers.some(item => item.id === member.spouseId))
    .map(member => buildBranch(member, visibleMembers, new Set()))
    .join('');

  dom.treeCanvas.innerHTML = `<div class="tree-forest">${rendered}</div>`;
}

function buildBranch(member, visibleMembers, visited) {
  if (visited.has(member.id)) {
    return '';
  }
  visited.add(member.id);

  const spouse = member.spouseId ? getMember(member.spouseId) : null;
  const spouseInBranch = spouse && visibleMembers.some(item => item.id === spouse.id);
  const children = getChildren(member.id)
    .filter(child => visibleMembers.some(item => item.id === child.id))
    .sort((a, b) => new Date(a.birthDate) - new Date(b.birthDate));

  const showSpouse = spouseInBranch && spouse.id !== member.id;
  const partnerBlock = showSpouse ? `<div class="couple-container">${buildNode(member, spouse)}</div>` : '';
  const singleBlock = !showSpouse ? buildNode(member) : `<div class="couple-container">${buildNode(member, spouse)}</div>`;

  const childBlocks = children.length
    ? `<div class="tree-children">${children.map(child => buildBranch(child, visibleMembers, visited)).join('')}</div>`
    : '';

  return `
    <div class="tree-branch">
      <div class="tree-couple ${showSpouse ? '' : 'single'}">
        ${showSpouse ? `<div class="couple-container">${buildNode(member, spouse)}</div>` : buildNode(member)}
      </div>
      ${childBlocks}
    </div>
  `;
}

function buildNode(primary, secondary = null) {
  if (secondary) {
    return [primary, secondary].map(person => buildNodeCard(person)).join('');
  }
  return buildNodeCard(primary);
}

function buildNodeCard(member) {
  const age = calculateAge(member.birthDate);
  const initials = getInitials(member.fullName);
  const photoHtml = member.photo
    ? `<img src="${member.photo}" alt="${member.fullName}">`
    : `<span>${initials}</span>`;
  const familyTag = member.familyId ? `<span class="node-badge">${member.familyId}</span>` : '';

  return `
    <article class="tree-node ${member.gender.toLowerCase()}" data-member-id="${member.id}">
      <div class="node-top">
        <span class="node-avatar">${photoHtml}</span>
        <div class="node-labels">
          <h3 class="node-name">${member.fullName}</h3>
          <p class="node-subtitle">ID ${member.id}</p>
        </div>
      </div>
      <div class="node-meta">
        <span>${member.gender}</span>
        <span>Age ${age}</span>
      </div>
      <p class="node-subtitle">Born ${formatDate(member.birthDate)}</p>
      ${familyTag}
      <div class="node-actions">
        <button type="button" class="btn outline" data-action="edit" data-id="${member.id}" title="Edit member">✎</button>
        <button type="button" class="btn outline" data-action="delete" data-id="${member.id}" title="Delete member">🗑</button>
      </div>
    </article>
  `;
}

function onTreeActionClick(event) {
  const button = event.target.closest('button[data-action]');
  const node = event.target.closest('.tree-node');
  if (!button && node) {
    const memberId = Number(node.dataset.memberId);
    openMemberModal(memberId);
    return;
  }

  if (!button) return;
  event.stopPropagation();
  const action = button.dataset.action;
  const id = Number(button.dataset.id);
  if (action === 'edit') {
    openMemberModal(id);
  }
  if (action === 'delete') {
    deleteMember(id);
  }
}

function deleteMember(id) {
  const member = getMember(id);
  if (!member) return;
  const confirmed = confirm(`Delete ${member.fullName} and remove all relationships referencing this member?`);
  if (!confirmed) return;

  members = members.filter(person => person.id !== id).map(person => {
    if (person.fatherId === id) person.fatherId = null;
    if (person.motherId === id) person.motherId = null;
    if (person.spouseId === id) person.spouseId = null;
    return person;
  });

  saveData();
  renderAll();
}

function calculateAge(dateString) {
  if (!dateString) return '-';
  const birth = new Date(dateString);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const month = today.getMonth() - birth.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
    age -= 1;
  }
  return age;
}

function formatDate(value) {
  const date = new Date(value);
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0].toUpperCase())
    .join('');
}

function exportJson() {
  const payload = JSON.stringify(members, null, 2);
  downloadFile('family-tree.json', payload, 'application/json');
  showSaveStatus('📥 Family tree exported as JSON');
}

function importJson(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(reader.result);
      if (!Array.isArray(imported)) throw new Error('Imported file must be a JSON array.');
      if (!imported.every(item => item.id && item.fullName)) throw new Error('Each member entry requires at least id and fullName.');
      members = imported;
      nextId = Math.max(1, ...members.map(member => member.id || 0)) + 1;
      saveData();
      renderAll();
      showSaveStatus('📤 Family tree imported successfully');
    } catch (error) {
      alert('Unable to import JSON file: ' + error.message);
    }
  };
  reader.readAsText(file);
  dom.importJsonInput.value = '';
}

function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function generateFinalPage() {
  const filteredMembers = members.slice();
  const html = buildExportPage(filteredMembers);
  downloadFile('FamilyTreeExport.html', html, 'text/html');
}

function buildExportPage(data) {
  const treeHtml = buildExportTree(data);
  const style = `
    body { margin: 0; font-family: Inter, sans-serif; background: #f8fafc; color: #111827; }
    .export-shell { padding: 24px; }
    .export-title { margin: 0 0 18px; font-size: 2rem; color: #111827; }
    .export-subtitle { margin: 0 0 28px; color: #475569; }
    .tree-forest { display: flex; flex-wrap: wrap; gap: 64px; justify-content: center; }
    .tree-branch { display: grid; gap: 24px; align-items: start; min-width: 320px; }
    .tree-couple { display: flex; justify-content: center; gap: 28px; flex-wrap: wrap; position: relative; }
    .tree-couple::after { content: ""; position: absolute; left: 50%; top: calc(100% + 6px); width: 2px; height: 20px; background: #ddd; transform: translateX(-50%); }
    .tree-couple.single::after { display: none; }
    .couple-container { display: flex; gap: 14px; background: rgba(255, 255, 255, 0.9); border: 2px solid #e2e8f0; border-radius: 20px; padding: 12px; box-shadow: 0 10px 20px rgba(15, 23, 42, 0.1); }
    .tree-children { display: flex; flex-wrap: wrap; justify-content: center; gap: 34px; padding-top: 26px; position: relative; }
    .tree-children::before { content: ""; position: absolute; left: 50%; top: 0; width: 2px; height: 26px; background: #ddd; transform: translateX(-50%); }
    .tree-node { min-width: 220px; max-width: 260px; background: linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.82)); border: 1px solid rgba(99, 102, 241, 0.15); border-radius: 24px; padding: 18px; box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08); display: grid; gap: 12px; position: relative; cursor: pointer; transition: all 0.3s ease; }
    .tree-node:hover { box-shadow: 0 30px 60px rgba(79, 70, 229, 0.2); transform: translateY(-4px); }
    .tree-node.male { background: linear-gradient(180deg, #87CEEB, #4682B4); }
    .tree-node.female { background: linear-gradient(180deg, #FFB6C1, #FF69B4); }
    .node-top { display: flex; align-items: center; gap: 14px; }
    .node-avatar { width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, #6366f1, #4f46e5); display: grid; place-items: center; color: white; font-size: 1.45rem; flex-shrink: 0; overflow: hidden; }
    .node-avatar img { width: 100%; height: 100%; object-fit: cover; }
    .node-labels { display: grid; gap: 4px; }
    .node-name { font-size: 1.05rem; font-weight: 700; line-height: 1.25; margin: 0; }
    .node-subtitle, .node-meta { margin: 0; color: #4b5563; font-size: 0.90rem; }
    .node-meta { display: flex; flex-wrap: wrap; gap: 10px; }
    .details-modal { display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.6); z-index: 10000; align-items: center; justify-content: center; }
    .details-modal.show { display: flex; }
    .details-panel { background: white; border-radius: 24px; max-width: 600px; max-height: 90vh; overflow-y: auto; padding: 32px; box-shadow: 0 25px 80px rgba(0, 0, 0, 0.3); animation: slideUp 0.3s ease-out; }
    @keyframes slideUp { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    .details-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .details-title { margin: 0; font-size: 1.8rem; }
    .details-close { background: none; border: none; font-size: 1.5rem; cursor: pointer; }
    .details-photo { width: 120px; height: 120px; border-radius: 12px; object-fit: cover; margin-bottom: 16px; }
    .details-section { margin-bottom: 20px; }
    .details-label { font-weight: 700; color: #111827; margin-bottom: 6px; }
    .details-value { color: #475569; }
    .photo-gallery { display: flex; gap: 8px; margin: 16px 0; }
    .photo-gallery-thumb { width: 80px; height: 80px; border-radius: 8px; object-fit: cover; cursor: pointer; border: 2px solid transparent; }
    .photo-gallery-thumb.active { border-color: #4f46e5; }
    .export-footer { margin-top: 28px; color: #64748b; font-size: 0.95rem; text-align: center; }
    @media print { .details-modal { display: none; } }
  `;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Family Tree Export</title>
  <style>${style}</style>
</head>
<body>
  <div class="export-shell">
    <h1 class="export-title">Kaneria Family Tree</h1>
    <p class="export-subtitle">Click on any box to view detailed information about family members.</p>
    <div class="tree-forest">${treeHtml}</div>
    <p class="export-footer">Developed by Shashank Kaneria, copyright © 2026</p>
  </div>
  
  <div class="details-modal" id="detailsModal">
    <div class="details-panel">
      <div class="details-header">
        <h2 class="details-title" id="detailsName"></h2>
        <button class="details-close" onclick="closeDetailsModal()">✕</button>
      </div>
      <div id="detailsContent"></div>
    </div>
  </div>

  <script>
    function showMemberDetails(member) {
      const modal = document.getElementById('detailsModal');
      const nameEl = document.getElementById('detailsName');
      const contentEl = document.getElementById('detailsContent');
      
      nameEl.textContent = member.fullName;
      
      let html = '';
      
      if (member.photos && member.photos.length > 0) {
        html += '<div class="photo-gallery">';
        member.photos.forEach((photo, idx) => {
          html += \`<img src="\${photo}" class="photo-gallery-thumb \${idx === 0 ? 'active' : ''}" alt="Photo \${idx + 1}" onclick="switchPhoto(this)">\`;
        });
        html += '</div>';
        html += \`<img src="\${member.photos[0]}" class="details-photo" id="mainPhoto" alt="Main photo">\`;
      }
      
      html += '<div class="details-section"><div class="details-label">Gender</div><div class="details-value">' + member.gender + '</div></div>';
      html += '<div class="details-section"><div class="details-label">Date of Birth</div><div class="details-value">' + member.birthDate + '</div></div>';
      
      if (member.birthPlace) html += '<div class="details-section"><div class="details-label">Birth Place</div><div class="details-value">' + member.birthPlace + '</div></div>';
      if (member.currentCity) html += '<div class="details-section"><div class="details-label">Current City</div><div class="details-value">' + member.currentCity + '</div></div>';
      if (member.phoneNumber) html += '<div class="details-section"><div class="details-label">Phone</div><div class="details-value">' + member.phoneNumber + '</div></div>';
      if (member.email) html += '<div class="details-section"><div class="details-label">Email</div><div class="details-value">' + member.email + '</div></div>';
      if (member.occupation) html += '<div class="details-section"><div class="details-label">Occupation</div><div class="details-value">' + member.occupation + '</div></div>';
      if (member.education) html += '<div class="details-section"><div class="details-label">Education</div><div class="details-value">' + member.education + '</div></div>';
      if (member.notes) html += '<div class="details-section"><div class="details-label">Notes</div><div class="details-value">' + member.notes + '</div></div>';
      
      contentEl.innerHTML = html;
      modal.classList.add('show');
    }
    
    function closeDetailsModal() {
      document.getElementById('detailsModal').classList.remove('show');
    }
    
    function switchPhoto(imgElement) {
      document.getElementById('mainPhoto').src = imgElement.src;
      document.querySelectorAll('.photo-gallery-thumb').forEach(thumb => thumb.classList.remove('active'));
      imgElement.classList.add('active');
    }
    
    window.addEventListener('click', (e) => {
      const modal = document.getElementById('detailsModal');
      if (e.target === modal) closeDetailsModal();
    });
  </script>
</body>
</html>`;
}

function buildExportTree(data) {
  let roots = data.filter(member => !member.fatherId && !member.motherId);
  if (!roots.length) {
    roots = data.slice();
  }
  const rendered = roots
    .filter(member => !member.spouseId || member.id < member.spouseId)
    .map(member => buildExportBranch(member, data, new Set()))
    .join('');
  return rendered || '<div>No members available for export.</div>';
}

function buildExportBranch(member, data, visited) {
  if (visited.has(member.id)) return '';
  visited.add(member.id);
  const spouse = member.spouseId ? data.find(item => item.id === member.spouseId) : null;
  const showSpouse = spouse && spouse.id !== member.id;
  const children = data.filter(item => item.fatherId === member.id || item.motherId === member.id);
  const coupleHtml = `
    <div class="tree-couple">
      ${showSpouse ? `<div class="couple-container">${buildExportNode(member)}${buildExportNode(spouse)}</div>` : buildExportNode(member)}
    </div>
  `;
  const childHtml = children.length ? `<div class="tree-children">${children.map(child => buildExportBranch(child, data, visited)).join('')}</div>` : '';
  return `<div class="tree-branch">${coupleHtml}${childHtml}</div>`;
}

function buildExportNode(member) {
  const age = calculateAge(member.birthDate);
  const initials = getInitials(member.fullName);
  const photoHtml = member.photos && member.photos.length > 0 ? `<img src="${member.photos[0]}" alt="${member.fullName}">` : `<span>${initials}</span>`;
  const memberJson = JSON.stringify(member).replace(/"/g, '&quot;');
  return `
    <div class="tree-node ${member.gender.toLowerCase()}" onclick="showMemberDetails(${memberJson})">
      <div class="node-top">
        <span class="node-avatar">${photoHtml}</span>
        <div class="node-labels">
          <strong class="node-name">${member.fullName}</strong>
          <p class="node-subtitle">ID ${member.id}</p>
        </div>
      </div>
      <div class="node-meta">
        <span>${member.gender}</span>
        <span>Age ${age}</span>
        <span>${formatDate(member.birthDate)}</span>
      </div>
    </div>`;
}

window.addEventListener('DOMContentLoaded', init);
