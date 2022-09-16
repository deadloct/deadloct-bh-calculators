function calculateTinfoilIF() {
    const eventBonusString = document.querySelector('#select1').value;
    const eventbonus = Number.parseFloat(eventBonusString, 10);
    const baseIF = Number.parseFloat(document.querySelector('#currentIF').value, 10);
    const output = (baseIF + 100) * (eventbonus);

    document.getElementById('simple-output').textContent = `${output}%`;
}

function calculateIF() {
    const inputRunesBonus1 = Number.parseFloat(document.querySelector('#selectLeftRune').value);
    const inputRunesBonus2 = Number.parseFloat(document.querySelector('#selectRightRune').value);
    const inputGuildBonus = Number.parseFloat(document.querySelector('#guildBonus').value);
    const inputConsumableBonus = Number.parseFloat(document.querySelector('#consumableBonus').value);
    const inputDailyBonus = Number.parseFloat(document.querySelector('#dailyBonus').value);
    const inputAdgorBonus = Number.parseFloat(document.querySelector('#adgorBonus').value);
    const inputEncounterBonus = Number.parseFloat(document.querySelector('#encounterBonus').value);

    const totalBonuses = 100 + inputRunesBonus1 + inputRunesBonus2 + inputGuildBonus + inputConsumableBonus + inputDailyBonus + inputAdgorBonus;
    const output = (totalBonuses) * (inputEncounterBonus);
    document.getElementById('standard-output').textContent = `${output}%`;
}

function calculateCapture() {
    const eventBonusString = document.querySelector('#select2').value;
    const eventbonus = Number.parseFloat(eventBonusString, 10);
    const baseIF = Number.parseFloat(document.querySelector('#currentCap').value, 10);
    const output = (baseIF + 100) * (eventbonus);
    const RaidFamPercentage = .1;
    const Common = 4;
    const Rare = 2.5;
    const Epic = 1.5
    const Leg = 1;
    const CapturePercentCommon = 0.4;
    const CapturePercentRare = 0.2;
    const CapturePrecentEpic = 0.15;
    const CapturePrecentLeg = 0.1;

    const percentage = .01;
    const BaseChancePerRunCommonDUngeon = output * Common * percentage;
    const BaseChancePerRunRareDungeon = output * Rare * percentage;
    const BaseChancePerRunEpicDungeon = output * Epic * percentage;
    const BaseChancePerRunEpicRaid = output * Epic * RaidFamPercentage * percentage;
    const BaseChancePerRunLegRaid = output * Leg * RaidFamPercentage * percentage;

    const BaseChancePerRunCommonDUngeonPercentage = (output * Common * percentage * CapturePercentCommon).toFixed(2);
    const BaseChancePerRunRareDungeonPercentage = (output * Rare * percentage * CapturePercentRare).toFixed(2);
    const BaseChancePerRunEpicDungeonPercentage = (output * Epic * percentage * CapturePrecentEpic).toFixed(2);
    const BaseChancePerRunEpicRaidPercentage = (output * Epic * RaidFamPercentage * percentage * CapturePrecentEpic).toFixed(2);
    const BaseChancePerRunLegRaidPercentage = (output * Leg * RaidFamPercentage * percentage * CapturePrecentLeg).toFixed(2);

    document.querySelector('.CommonDungeonFam').textContent = `${BaseChancePerRunCommonDUngeon}%`;
    document.querySelector('.RareDungeonFam').textContent = `${BaseChancePerRunRareDungeon}%`;
    document.querySelector('.EpicDungeonFam').textContent = `${BaseChancePerRunEpicDungeon}%`;
    document.querySelector('.EpicRaidFam').textContent = `${BaseChancePerRunEpicRaid}%`;
    document.querySelector('.LegRaidFam').textContent = `${BaseChancePerRunLegRaid}%`;

    document.querySelector('.CommonDungeonFamPercentage').textContent = `${BaseChancePerRunCommonDUngeonPercentage}%`;
    document.querySelector('.RareDungeonFamPercentage').textContent = `${BaseChancePerRunRareDungeonPercentage}%`;
    document.querySelector('.EpicDungeonFamPercentage').textContent = `${BaseChancePerRunEpicDungeonPercentage}%`;

    document.querySelector('.EpicRaidFamPercentage').textContent = `${BaseChancePerRunEpicRaidPercentage}%`;
    document.querySelector('.LegRaidFamPercentage').textContent = `${BaseChancePerRunLegRaidPercentage}%`;

    document.getElementById('caprate-output').textContent = `${output}%`;
}
