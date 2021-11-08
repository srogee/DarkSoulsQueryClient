const url = `http://localhost:5000/WorldFlags`
const timeBetweenQueries = 1000;
const bosses = [
    {
        id: "Bosses.IudexGundyr.Defeated",
        name: "Iudex Gundyr"
    },
    {
        id: "Bosses.Aldrich.Defeated",
        name: "Aldrich"
    },
    {
        id: "Bosses.YhormTheGiant.Defeated",
        name: "Yhorm"
    },
    {
        id: "Bosses.AbyssWatchers.Defeated",
        name: "Abyss Watchers"
    },
    {
        id: "Bosses.TwinPrinces.Defeated",
        name: "Twin Princes"
    },
    {
        id: "Bosses.SoulOfCinder.Defeated",
        name: "Soul of Cinder"
    }
];

function getBossDisplayHtml(boss, data) {
    var isDefeated = data && data.find(flag => flag.id === boss.id && flag.value) != null;
    if (isDefeated) {
        return `<div class="text defeated">${boss.name}</div>`;
    }
    return `<div class="text">${boss.name}</div>`;
}

function getErrorMessageHtml(data) {
    if (data === null) {
        return `<div class="text error">Unable to fetch. Ensure server is running</div>`
    }

    return '';
}

doQueryLoop();
async function doQueryLoop() {
    var data = await query();
    var message = getErrorMessageHtml(data);
    var str = message + bosses.map(boss => getBossDisplayHtml(boss, data)).join('');
    document.getElementById("textDiv").innerHTML = str;
    setTimeout(doQueryLoop, timeBetweenQueries);
}

async function query() {
    var data = null;
    try {
        data = await fetch(url).then(response => response.json());
        if (data) {
            return data;
        }
    } catch (e) {}

    return null;
}
