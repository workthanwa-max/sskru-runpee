import {
  formatFiles,
  generateFiles,
  installPackagesTask,
  joinPathFragments,
  readProjectConfiguration,
  Tree,
  updateProjectConfiguration,
} from '@nx/devkit';
import { libraryGenerator } from '@nx/node';
import * as path from 'path';
import { OnionArchitectureGeneratorSchema } from './schema';

export async function onionArchitectureGenerator(tree: Tree, options: OnionArchitectureGeneratorSchema) {
  const projectRoot = `libs/${options.name}`;

  await libraryGenerator(tree, {
    name: options.name,
    directory: projectRoot,
    compiler: 'tsc',
  });

  const libraryRoot = readProjectConfiguration(tree, options.name).root;

  tree.delete(joinPathFragments(libraryRoot, 'src'));

  generateFiles(tree, path.join(__dirname, 'files'), libraryRoot, options);

  updateProjectConfiguration(tree, options.name, {
    root: projectRoot,
    targets: {
      'db:generate': {
        executor: 'nx:run-commands',
        defaultConfiguration: 'local',
        options: {
          command: 'drizzle-kit generate --config=./src/infrastructure/read-storage/drizzle/config.ts',
          cwd: projectRoot,
        },
        configurations: {
          local: {},
        },
      },
      'db:migrate': {
        executor: 'nx:run-commands',
        defaultConfiguration: 'local',
        options: {
          command: 'drizzle-kit migrate --config=./src/infrastructure/read-storage/drizzle/config.ts',
          cwd: projectRoot,
        },
        configurations: {
          local: {},
        },
      },
      'db:reset': {
        executor: 'nx:run-commands',
        options: {
          command: 'ts-node ./src/infrastructure/read-storage/drizzle/seeds/reset.ts',
          cwd: projectRoot,
        },
      },
      'export-definition': {
        executor: '@sskru/export-definition:application',
      },
      codegen: {
        metadata: {
          cwd: projectRoot,
        },
        executor: '@sskru/graphql-codegen:apollo-server',
      },
    },
  });

  await formatFiles(tree);

  return () => {
    installPackagesTask(tree);
  };
}

export default onionArchitectureGenerator;
