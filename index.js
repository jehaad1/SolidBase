#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import figlet from "figlet";
import { exec } from "child_process";
import { rimraf } from "rimraf";

const stackName = "SolidBase";
figlet(stackName, (err, data) => {
  console.log(gradient.pastel.multiline(data));
  initPrompt();
});

function initPrompt() {
  inquirer
    .prompt({
      name: "name",
      type: "input",
      message: "     Project Name:",
    })
    .then((answers) => {
      let projectName = answers["name"];
      promptYesNo("     Would you like to initialize Solid Router?")
        .then((confirmation) => {
          if (confirmation) {
            const templates = [
              "https://github.com/jehaad1/SolidBase-Template1",
              "https://github.com/jehaad1/SolidBase-Template2",
            ];
            console.log(
              chalk.green(
                "\n       Alright! We will initialize Solid Router for you.\n"
              )
            );
            initFirebase(templates, projectName);
          } else {
            const templates = [
              "https://github.com/jehaad1/SolidBase-Template3",
              "https://github.com/jehaad1/SolidBase-Template4",
            ];
            console.log(
              chalk.green(
                "\n       Got it! We won't initialize Solid Router at this time.\n"
              )
            );
            initFirebase(templates, projectName);
          }
        })
        .catch((err) => {
          console.log(
            chalk.red("\n       ", err.split("\n").join("\n       "))
          );
        });
    });
}

function createTemplateFiles(templateLink, projectName) {
  exec(`git clone ${templateLink} ${projectName}`, (error) => {
    if (error) {
      console.log(chalk.red("\n       ✖ Failed to clone the template."));
      console.log(
        chalk.red(`       ${error.message.split("\n").join("\n       ")}`)
      );
    } else {
      console.log(chalk.green("\n       ✔ Template cloned successfully!\n"));
      rimraf(`${projectName}/.git`);
      promptYesNo("     Do you want us to install the dependencies for you?")
        .then((confirmation) => {
          if (confirmation) {
            console.log(
              chalk.green(
                "\n       Awesome! give us some time to install the dependencies."
              )
            );
            console.log(
              "\n       " + chalk.bgGreen.bold(" Installing dependencies... ")
            );
            exec(
              projectName !== "." ? `cd ${projectName} && npm i` : "npm i",
              (error, stdout) => {
                if (error) {
                  console.log(
                    chalk.red("\n       ✖ Failed to install the dependencies.")
                  );
                  console.log(chalk.red(`     ${error.message}`));
                } else {
                  console.log(
                    chalk.green(
                      "\n       ✔ Dependencies installed successfully!"
                    )
                  );
                  console.log(stdout.split("\n").join("\n       "));
                  if (projectName === ".")
                    console.log(
                      chalk.green(
                        "\n       " + chalk.bgGray.bold(` npm start `) + "\n"
                      )
                    );
                  else
                    console.log(
                      chalk.green("\n       Run your project: ") +
                        "\n       " +
                        chalk.bgGray.bold(` cd ${projectName} `) +
                        "\n       " +
                        chalk.bgGray.bold(` npm start `) +
                        "\n"
                    );
                  end();
                }
              }
            );
          } else {
            if (projectName === ".") {
              console.log(
                chalk.green("\n       Never mind! You can still run: ") +
                  chalk.bgGray.bold(" npm i ") +
                  chalk.green(" later to install them.\n")
              );
            } else {
              console.log(
                chalk.green("\n       Never mind! You can still run: ") +
                  "\n       " +
                  chalk.bgGray.bold(` cd ${projectName}  `) +
                  "\n       " +
                  chalk.bgGray.bold(` npm i `) +
                  chalk.green("\n       to install them.\n")
              );
            }
            end();
          }
        })
        .catch((err) => {
          console.log(
            chalk.red("\n       ", err.split("\n").join("\n       "))
          );
        });
    }
  });
}

async function promptYesNo(message) {
  const question = {
    name: "confirmation",
    type: "confirm",
    message,
    default: true,
  };

  const answer = await inquirer.prompt(question);
  return answer.confirmation;
}

async function initFirebase(templates, projectName) {
  promptYesNo(
    "     Would you like to set up Firebase Cloud Firestore and Auth?"
  )
    .then((confirmation) => {
      if (confirmation) {
        console.log(
          chalk.green("\n       Alright! We will set up firebase for you.\n")
        );
        createTemplateFiles(templates[0], projectName);
      } else {
        console.log(
          chalk.green(
            "\n       No problem! We will configure Firebase without setting it up.\n"
          )
        );
        createTemplateFiles(templates[1], projectName);
      }
    })
    .catch((err) => {
      console.log(chalk.red("\n     ", err));
    });
}

function end() {
  console.log("\n       " + chalk.blue.bold("Made with ❤️ by Jehaad."));
  console.log(
    chalk.blue("       SolidBase: https://github.com/jehaad1/SolidBase")
  );
}
