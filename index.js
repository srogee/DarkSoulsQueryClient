const url = `http://localhost:5000/ReadArbitraryValues`
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

function hasBossBeenDefeated(boss, data) {
    return data && data.find(flag => flag.id === boss.id && flag.value) != null;
}

function getBossDisplayHtml(boss, data) {
    if (hasBossBeenDefeated(boss, data)) {
        return `<div class="text defeated">${boss.name}</div>`;
    }
    return `<div class="text">${boss.name}</div>`;
}

function getErrorMessageHtml(data) {
    if (data === null) {
        return `<div class="text error">(Unable to fetch. Ensure server is running)</div>`;
    } else if (data && data.length === 0) {
        return `<div class="text error">(Unable to fetch. Ensure Dark Souls III is running)</div>`;
    }

    return '';
}

doQueryLoop();
async function doQueryLoop() {
    let data = await query();
    let errorMessage = getErrorMessageHtml(data);

    let sortedBosses = [...bosses].sort((a, b) => {
        let aDefeated = hasBossBeenDefeated(a, data);
        let bDefeated = hasBossBeenDefeated(b, data);
        if (aDefeated === bDefeated) {
            return bosses.findIndex(boss => boss.id === a.id) - bosses.findIndex(boss => boss.id === b.id);
        } else {
            return bDefeated - aDefeated;
        }
    });
    let bossesHtml = sortedBosses.map(boss => getBossDisplayHtml(boss, data)).join('');

    document.getElementById("textDiv").innerHTML = errorMessage + bossesHtml;
    setTimeout(doQueryLoop, timeBetweenQueries);
}

async function query() {
    let valuesToInspect = bosses.map(boss => boss.id);
    let data = null;
    try {
        let params = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(valuesToInspect)
        }
        data = await fetch(url, params).then(response => response.json());
        if (data) {
            return data;
        }
    } catch (e) {}

    return null;
}
