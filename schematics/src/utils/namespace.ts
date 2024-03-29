import { createTypeParser, removeGenerics } from "./type";

export function parseNamespace(solution: string, type: string) {
  const parseType = createTypeParser(removeGenerics);
  let namespace = parseType(type)[0].split(".").slice(0, -1).join(".");

  if (solution === namespace) return "";

  //zoey
  solution += "|Volo.Abp|Volo.Abp.AspNetCore.Mvc|Pages.Abp|EasyAbp.Abp";

  solution.split("|").forEach((item) => {
    if (item !== "") {
      item.split(".").reduceRight((acc, part) => {
        acc = `${part}\\.${acc}`;
        const regex = new RegExp(`^${acc}(Controllers\\.)?`);
        namespace = namespace.replace(regex, "");
        return acc;
      }, "");
    }
  });
  return namespace;
}
