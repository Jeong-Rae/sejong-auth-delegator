import replace from "replace-in-file";

const replaceOptions = {
    files: "./dist/cjs/**/*.cjs",
    from: /\.js/g,
    to: ".cjs",
    allowEmptyPaths: false,
};

replace(replaceOptions)
    .then((results) => {
        console.log("Replacement results:", results);
    })
    .catch((error) => {
        console.error("Error occurred:", error);
    });
