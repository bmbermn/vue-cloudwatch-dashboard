export default class DatasetArray extends Array {
  mergedDataNoZeros() {
    return this.reduce((merged, dataset) => (
      merged.concat(dataset.data.filter(d => d.y > 0))
    ), []);
  }

  average() {
    const noZeros = this.mergedDataNoZeros();
    return noZeros
      .reduce((sum, data) => sum + data.y, 0) / noZeros.length;
  }

  sum() {
    return this.reduce((sum, dataset) => (
      sum + dataset.data.reduce((s, d) => s + d.y, 0)
    ), 0);
  }

  tagged(tags) {
    const datasets = new DatasetArray();
    this.forEach((dataset) => {
      if (Array.isArray(tags) && [...new Set([...dataset.tags, ...tags])].length > 0) {
        // Arrays share element
        datasets.push(dataset);
      } else if (typeof tags === 'string' && dataset.tags.includes(tags)) {
        datasets.push(dataset);
      }
    });
    return datasets;
  }
}
