import React from "react";
import algoliasearch from "algoliasearch/lite";
import { Configure, InstantSearch, Hits, Highlight } from "react-instantsearch-dom";
import { Link } from "gatsby";
import { useQueryParam, StringParam } from "use-query-params";

import Page from "../components/Page";

function Hit({ hit }) {
  return (
    <Link
      className="block my-48 md:flex leading-8 tracking-wide"
      to={hit.permalink}
    >
      <div className="mb-16 md:mb-0 mr-20 max-w-180 w-full flex-shrink-0 font-serif text-24 font-bold">
        {hit.pageName}
      </div>
      <div className="flex-grow">
        <h2 className="font-serif text-24 font-bold">
          <Highlight hit={hit} attribute="name" />
        </h2>
        <p className="mt-16">
          <Highlight hit={hit} attribute="content" />
        </p>
      </div>
    </Link>
  )
}

export default function SearchPage(props) {
  const { pageContext } = props;
  const { pageData } = pageContext;
  const { appID, searchOnlyAPIKey, searchIndex } = pageData;

  const [query = ""] = useQueryParam("q", StringParam);

  const searchClient = algoliasearch(
    appID,
    searchOnlyAPIKey,
  );

  return (
    <Page {...props}>
      <section className="w-full max-w-screen-xl mx-auto mt-48 md:px-20 tracking-wide leading-8">
        <InstantSearch
          searchClient={searchClient}
          indexName={searchIndex}
        >
          <Configure
            query={query}
            distinct={1}
          />
          <Hits hitComponent={Hit} />
        </InstantSearch>
      </section>
    </Page>
  );
}
