import _filter from "lodash.filter";
import _includes from "lodash.includes";
import _lowerCase from "lodash.lowercase";
import _get from "lodash.get";

export function getItemsMatchingSearchQuery(itemsList, searchQuery) {
  return _filter(itemsList, (product) => {
    return (
      _includes(_lowerCase(_get(product, "name")), _lowerCase(searchQuery)) ||
      _includes(
        _lowerCase(_get(product, "description")),
        _lowerCase(searchQuery)
      )
    );
  });
}
