import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from "@jupyterlab/application";

import { ILauncher } from "@jupyterlab/launcher";

import { readmeIcon } from "./icons";

namespace Attributes {
  export const command = "webds_readme:open";
  export const id = "webds_readme_widget";
  export const label = "README";
  export const caption = "README";
  export const category = "DSDK - Application";
  export const rank = 10;
}

const readmeDoc = "Synaptics/_links/README";

/**
 * Initialization data for the @webds/readme extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: "@webds/readme:plugin",
  autoStart: true,
  requires: [ILauncher],
  activate: (app: JupyterFrontEnd, launcher: ILauncher) => {
    console.log("JupyterLab extension @webds/readme is activated!");

    const { commands, shell } = app;
    const command = Attributes.command;
    commands.addCommand(command, {
      label: Attributes.label,
      caption: Attributes.caption,
      icon: (args: { [x: string]: any }) =>
        args["isLauncher"] ? readmeIcon : undefined,
      execute: async () => {
        commands
          .execute("docmanager:open", {
            path: readmeDoc,
            factory: "Markdown Preview"
          })
          .then((widget) => {
            widget.id = Attributes.id;
            widget.title.closable = true;
            if (!widget.isAttached) shell.add(widget, "main");
            shell.activateById(widget.id);
          });
      }
    });

    launcher.add({
      command,
      args: { isLauncher: true },
      category: Attributes.category,
      rank: Attributes.rank
    });
  }
};

export default plugin;
