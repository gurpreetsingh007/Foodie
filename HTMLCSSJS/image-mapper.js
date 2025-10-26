const images = [
    'images/IMG_0003.HEIC',
    'images/IMG_0096.HEIC',
    'images/IMG_0121.JPG',
    'images/IMG_0123.JPG',
    'images/IMG_4767.HEIC',
    'images/IMG_6008.JPG',
    'images/IMG_6009.JPG',
    'images/IMG_6010.JPG',
    'images/IMG_8115.HEIC',
    'images/IMG_8312.HEIC',
    'images/IMG_9202.HEIC',
    'images/IMG_9222.HEIC',
    'images/IMG_9914.HEIC'
];

const descriptions = [
    "Delicious shrimp cocktail hors d'oeuvres featuring plump, freshly cooked shrimp served with tangy, homemade cocktail sauce, garnished with sliced green onions.",
    "Grilled Sweet chili Chicken on a bed of honey glazed sliced carrots and savory pan seared asparagus.",
    "Sunday dinner on the go.. Soul Rolls includes creamy macaroni and cheese, smoked turkey greens and candied yams",
    "Wedding hors d’oeuvres table featuring Barbecue Beef meatballs and a Garden salad Tower",
    "Grilled Honey Glazed Salmon",
    "Jerk Chicken Orzo Pasta with a lime garnish",
    "Grilled Halibut, Sautéed Spinach & Mushrooms, honey glazed carrots with a Spicy Truffle Chive Sauce",
    "Bruschetta",
    "B.S.K Frisco Sliders perfect for any occasion",
    "Sweet Chili Chicken & waffle sliders topped with coleslaw",
    "Customizable Breakfast Platter featuring scrambled eggs, Pan fried potatoes, Strawberry Vanilla French Toast, Assorted fruit & Mimosas"
];

const mapper = document.getElementById('mapper');
const output = document.getElementById('output');

images.forEach((src, idx) => {
    const card = document.createElement('div');
    card.className = 'mapper-card';
    const img = document.createElement('img');
    img.src = src;
    img.alt = src;
    const label = document.createElement('div');
    label.textContent = src.split('/').pop();

    const select = document.createElement('select');
    select.className = 'desc-select';
    const empty = document.createElement('option'); empty.value = ''; empty.textContent = '-- select description --'; select.appendChild(empty);
    descriptions.forEach((d, i) => {
        const o = document.createElement('option'); o.value = i + 1; o.textContent = `${i + 1}. ${d.substring(0, 60)}...`; select.appendChild(o);
    });

    card.appendChild(img);
    card.appendChild(label);
    card.appendChild(select);
    mapper.appendChild(card);
});

document.getElementById('export').addEventListener('click', () => {
    const mapping = {};
    const selects = document.querySelectorAll('.desc-select');
    selects.forEach((sel, i) => {
        const val = sel.value;
        mapping[images[i]] = val ? Number(val) : null;
    });
    output.style.display = 'block';
    output.textContent = JSON.stringify(mapping, null, 2);
});
