// ==================================================
// カードデータ
// ==================================================

let cardData = {};


// 現在選択しているテーマ
let currentTheme = null;


// ==================================================
// 画面
// ==================================================

const modeSelect =
    document.getElementById("mode-select");

const cardMode =
    document.getElementById("card-mode");

const colorMode =
    document.getElementById("color-mode");


// ==================================================
// モード選択ボタン
// ==================================================

const cardModeButton =
    document.getElementById("card-mode-button");

const colorModeButton =
    document.getElementById("color-mode-button");


// ==================================================
// 戻るボタン
// ==================================================

const cardBackButton =
    document.getElementById("card-back-button");

const colorBackButton =
    document.getElementById("color-back-button");


// ==================================================
// 色分けモード
// ==================================================

const colorGrid =
    document.getElementById("color-grid");

const gameOver =
    document.getElementById("game-over");

const resetButton =
    document.getElementById("reset-button");


// 色分けゲーム終了状態
let isGameOver = false;


// ==================================================
// カードモード
// ==================================================

const themeSelect =
    document.getElementById("theme-select");

const cardGame =
    document.getElementById("card-game");

const cardGrid =
    document.getElementById("card-grid");

const selectedTheme =
    document.getElementById("selected-theme");

const themeBackButton =
    document.getElementById("theme-back-button");

const cardResetButton =
    document.getElementById("card-reset-button");

const themeButtons =
    document.querySelectorAll(".theme-button");


// ==================================================
// カードデータを読み込む
// ==================================================

async function loadCardData() {

    try {

        const response =
            await fetch("cards.json");


        if (!response.ok) {

            throw new Error(
                "cards.jsonを読み込めませんでした。"
            );

        }


        cardData =
            await response.json();


        console.log(
            "カードデータを読み込みました。"
        );


        console.log(cardData);

    }

    catch (error) {

        console.error(
            "カードデータの読み込みに失敗しました。",
            error
        );

    }

}


// ==================================================
// モード選択
// ==================================================


// カードモード
cardModeButton.addEventListener(
    "click",
    function () {

        modeSelect.classList.add("hidden");

        cardMode.classList.remove("hidden");

    }
);


// 色分けモード
colorModeButton.addEventListener(
    "click",
    function () {

        modeSelect.classList.add("hidden");

        colorMode.classList.remove("hidden");

        createColorGrid();

    }
);


// ==================================================
// モード選択へ戻る
// ==================================================


// カードモード → モード選択
cardBackButton.addEventListener(
    "click",
    function () {

        cardMode.classList.add("hidden");

        modeSelect.classList.remove("hidden");


        // カードモードを初期状態に戻す

        themeSelect.classList.remove(
            "hidden"
        );

        cardGame.classList.add(
            "hidden"
        );

    }
);


// 色分けモード → モード選択
colorBackButton.addEventListener(
    "click",
    function () {

        colorMode.classList.add(
            "hidden"
        );

        modeSelect.classList.remove(
            "hidden"
        );

    }
);


// ==================================================
// カードモード
// ==================================================


// テーマボタン
themeButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const theme =
                    button.dataset.theme;


                createCardGrid(theme);

            }
        );

    }
);


// ==================================================
// テーマ選択へ戻る
// ==================================================

themeBackButton.addEventListener(
    "click",
    function () {

        cardGame.classList.add(
            "hidden"
        );

        themeSelect.classList.remove(
            "hidden"
        );

    }
);


// ==================================================
// カードモードのリセット
// ==================================================

cardResetButton.addEventListener(
    "click",
    function () {

        // 現在選択しているテーマで
        // もう一度カードを作成する

        if (currentTheme !== null) {

            createCardGrid(currentTheme);

        }

    }
);


// ==================================================
// カード5×5を作成
// ==================================================

async function createCardGrid(theme) {

    // ==================================================
    // 現在のテーマを保存
    // ==================================================

    currentTheme = theme;


    // ==================================================
    // カードデータが読み込まれていなければ読み込む
    // ==================================================

    if (
        Object.keys(cardData).length === 0
    ) {

        await loadCardData();

    }


    // ==================================================
    // 選択したテーマのカードを取得
    // ==================================================

    const cards =
        cardData[theme];


    // ==================================================
    // テーマが存在しない場合
    // ==================================================

    if (!cards) {

        console.error(
            "存在しないテーマです:",
            theme
        );

        return;

    }


    // ==================================================
    // 25枚未満の場合
    // ==================================================

    if (cards.length < 25) {

        alert(
            "このテーマのカードが25枚未満です。"
        );

        return;

    }


    // ==================================================
    // 古いカードを削除
    // ==================================================

    cardGrid.innerHTML = "";


    // ==================================================
    // 画面切り替え
    // ==================================================

    themeSelect.classList.add(
        "hidden"
    );

    cardGame.classList.remove(
        "hidden"
    );


    // ==================================================
    // テーマ名
    // ==================================================

    selectedTheme.textContent =
        "テーマ" + theme;


    // ==================================================
    // カード配列をコピー
    // ==================================================

    const selectedCards =
        [...cards];


    // ==================================================
    // カードをランダムにする
    // ==================================================

    shuffle(selectedCards);


    // ==================================================
    // 25枚表示
    // ==================================================

    for (
        let i = 0;
        i < 25;
        i++
    ) {

        const card =
            document.createElement("div");


        // マス
        card.classList.add(
            "grid-cell"
        );


        // カードの内容
        card.textContent =
            selectedCards[i];


        // ==================================================
        // タップ処理
        // ==================================================

        card.addEventListener(
            "click",
            function () {

                card.classList.toggle(
                    "gray"
                );

            }
        );


        // グリッドに追加
        cardGrid.appendChild(
            card
        );

    }

}


// ==================================================
// 色分けモード
// ==================================================


// 5×5を作成
function createColorGrid() {

    // ゲーム終了状態を解除
    isGameOver = false;


    // 古いマスを削除
    colorGrid.innerHTML = "";


    // ゲーム終了表示を隠す
    gameOver.classList.add(
        "hidden"
    );


    // ==================================================
    // 色の配列
    // ==================================================

    const colors = [];


    // 青9個
    for (
        let i = 0;
        i < 9;
        i++
    ) {

        colors.push("blue");

    }


    // 赤8個
    for (
        let i = 0;
        i < 8;
        i++
    ) {

        colors.push("red");

    }


    // 黒1個
    colors.push("black");


    // 白7個
    for (
        let i = 0;
        i < 7;
        i++
    ) {

        colors.push("white");

    }


    // ==================================================
    // ランダム化
    // ==================================================

    shuffle(colors);


    // ==================================================
    // 25マス作成
    // ==================================================

    for (
        let i = 0;
        i < 25;
        i++
    ) {

        const cell =
            document.createElement("div");


        // マス
        cell.classList.add(
            "grid-cell"
        );


        // 色
        cell.classList.add(
            colors[i]
        );


        // 元の色
        cell.dataset.originalColor =
            colors[i];


        // 選択状態
        cell.dataset.selected =
            "false";


        // ==================================================
        // クリック
        // ==================================================

        cell.addEventListener(
            "click",
            function () {

                toggleCell(cell);

            }
        );


        colorGrid.appendChild(
            cell
        );

    }

}


// ==================================================
// 色分けマスの切り替え
// ==================================================

function toggleCell(cell) {

    // ゲーム終了後は操作できない
    if (isGameOver) {

        return;

    }


    // 現在の選択状態
    const selected =
        cell.dataset.selected === "true";


    // 元の色
    const originalColor =
        cell.dataset.originalColor;


    // ==================================================
    // グレー → 元の色
    // ==================================================

    if (selected) {

        cell.classList.remove(
            "gray"
        );


        cell.classList.add(
            originalColor
        );


        cell.dataset.selected =
            "false";

    }


    // ==================================================
    // 元の色 → グレー
    // ==================================================

    else {

        cell.classList.remove(
            originalColor
        );


        cell.classList.add(
            "gray"
        );


        cell.dataset.selected =
            "true";

    }


    // ==================================================
    // 終了判定
    // ==================================================

    checkGameOver();

}


// ==================================================
// ゲーム終了判定
// ==================================================

function checkGameOver() {

    // 現在の25マス
    const cells =
        document.querySelectorAll(
            "#color-grid .grid-cell"
        );


    // 残っている色
    let blueCount = 0;

    let redCount = 0;

    let blackCount = 0;


    // ==================================================
    // 全マスを確認
    // ==================================================

    cells.forEach(
        function (cell) {

            const selected =
                cell.dataset.selected === "true";


            // グレーではない場合
            if (!selected) {

                const color =
                    cell.dataset.originalColor;


                if (color === "blue") {

                    blueCount++;

                }


                else if (color === "red") {

                    redCount++;

                }


                else if (color === "black") {

                    blackCount++;

                }

            }

        }
    );


    // ==================================================
    // ゲーム終了
    // ==================================================

    if (
        blueCount === 0 ||
        redCount === 0 ||
        blackCount === 0
    ) {

        isGameOver = true;


        gameOver.classList.remove(
            "hidden"
        );


        console.log(
            "ゲーム終了"
        );

    }

}


// ==================================================
// 色分けモードのリセット
// ==================================================

resetButton.addEventListener(
    "click",
    function () {

        createColorGrid();

    }
);


// ==================================================
// 配列をシャッフル
// ==================================================

function shuffle(array) {

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );


        [
            array[i],
            array[j]
        ] = [
            array[j],
            array[i]
        ];

    }

}


// ==================================================
// 最初にカードデータを読み込む
// ==================================================

loadCardData();