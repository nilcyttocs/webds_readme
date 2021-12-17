import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ILauncher } from '@jupyterlab/launcher';

import { readmeIcon } from './icons';

const readmeDoc = 'Synaptics/_links/README';

/**
 * Initialization data for the @webds/readme extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: '@webds/readme:plugin',
  autoStart: true,
  requires: [ILauncher],
  activate: (app: JupyterFrontEnd, launcher: ILauncher) => {
    console.log('JupyterLab extension @webds/readme is activated!');

    const { commands, shell } = app;
    const command: string = 'webds_readme:open';
    commands.addCommand(command, {
      label: 'README',
      caption: 'README',
      icon: (args: { [x: string]: any }) => (args['isLauncher'] ? readmeIcon : undefined),
      execute: async () => {
        commands.execute('docmanager:open', {
          path: readmeDoc,
          factory: 'Markdown Preview',
        })
        .then((widget) => {
          widget.id = 'webds_readme_widget';
          widget.title.closable = true;
          if (!widget.isAttached)
            shell.add(widget, 'main');
          shell.activateById(widget.id);
        });
      },

    });

    launcher.add({ command, args: { isLauncher: true }, category: 'WebDS', rank: 0 });
  }
};

export default plugin;
