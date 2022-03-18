import { SchematicContext, Tree } from "@angular-devkit/schematics";
import {
  buildDefaultPath,
  createProxyIndexGenerator,
  // removeDefaultPlaceholders,
  // resolveProject,
} from "../../utils";

export default function (_: { target?: string }) {
  // const params = removeDefaultPlaceholders(schema);

  return async (host: Tree, _context: SchematicContext) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    // const target = await resolveProject(host, params.target!);
    // const targetPath = buildDefaultPath(target.definition);
    const targetPath = buildDefaultPath();

    const generateIndex = createProxyIndexGenerator(targetPath);

    return generateIndex(host);
  };
}
