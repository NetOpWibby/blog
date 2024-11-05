


//// export

export default (suppliedArray: any): string => {
  /// The funky indentation in the backticks is just so the rendered HTML
  /// looks good when viewing source. There really ought to be a module that
  /// does this for you but the web industry only cares about build pipelines
  /// and littering your front-end with endless amounts of <div>s. YUK.

  const tableItems = suppliedArray.map((arrayItem: { file: string, size: number }) => {
    if (!arrayItem)
      return "";

    const { file, size } = arrayItem;

    return `
            <div class="grid">
              <div class="col">${size}</div>
              <div class="col"><a href="/${file}">${file}</a></div>
            </div>
          `;
  });

  return `
          <section>
            <div class="grid">
              <div class="col">size</div>
              <div class="col">filename</div>
            </div>
            ${tableItems.join("")}</section>`;
}
