import { logger, PromiseExecutor } from '@nx/devkit';
import fg from 'fast-glob';
import * as fs from 'fs';
import { join, relative, resolve, sep } from 'path';
import { ExportDefinitionExecutorSchema } from './schema';

const runExecutor: PromiseExecutor<ExportDefinitionExecutorSchema> = async (options, context) => {
  const projectRoot = `libs/${context.projectName}`;
  const cwd = context.cwd;
  const basePath = `${projectRoot}/src/application`;

  const exportConfig = {
    pattern: `${basePath}/*/**/definitions/*.ts`,
    ignore: ['**/*.spec.ts', '**/*.d.ts', '**/index.ts'],
  };

  const files = await fg(exportConfig.pattern, {
    ignore: exportConfig.ignore,
    absolute: false,
    dot: false,
    cwd: cwd,
    onlyFiles: true,
  });

  const cleanPath = (filePath: string) => {
    const relativePath = relative(basePath, join(cwd, filePath));
    return relativePath.split(sep).join('/').replace(/\.ts$/, '');
  };

  const exportStatements = files.map((file) => {
    const cleanedPath = cleanPath(file);
    return `export * from './${cleanedPath}';`;
  });

  const exportedPath = join(cwd, `${basePath}/index.ts`);

  fs.mkdirSync(resolve(exportedPath, '..'), { recursive: true });

  fs.writeFileSync(exportedPath, exportStatements.join('\n'));

  logger.info('Export statements to be generated:');

  exportStatements.forEach((statement) => logger.info(statement));

  logger.info(`Export statements written to: ${exportedPath}`);

  return {
    success: true,
  };
};

export default runExecutor;
