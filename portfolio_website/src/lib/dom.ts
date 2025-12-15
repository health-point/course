export function $<T extends HTMLElement = HTMLElement>(
  selector: string,
  parent: ParentNode = document
): T {
  const el = parent.querySelector(selector);
  if (!el) {
    throw new Error(`'эл не найден': ${selector}`);
  }
  return el as T;
}

export function $$<T extends HTMLElement = HTMLElement>(
  selector: string,
  parent: ParentNode = document
): NodeListOf<T> {
  return parent.querySelectorAll(selector) as NodeListOf<T>;
}