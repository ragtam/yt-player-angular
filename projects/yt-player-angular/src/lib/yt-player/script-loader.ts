export function loadScript(src: string): Promise<HTMLScriptElement> {
  return new Promise((resolve, reject) => {
    const script = createScriptElement();

    script.src = src;

    script.onload = () => {
      resolve(script);
    };

    script.onerror = () => {
      reject(new Error(`Failed to load ${src}`));
    };

    getHeadElement().appendChild(script);
  });
}

function createScriptElement(): HTMLScriptElement {
  const s = document.createElement('script');
  s.async = true;
  return s;
}

function getHeadElement() {
  return document.head || document.getElementsByTagName('head')[0];
}
