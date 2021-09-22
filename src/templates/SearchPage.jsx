import React from "react";
import algoliasearch from "algoliasearch/lite";
import { Configure, InstantSearch, Hits, Highlight } from "react-instantsearch-dom";
import { useQueryParam, StringParam } from "use-query-params";

import Link from "../components/Link";
import Page from "../components/Page";

function Hit({ hit }) {
  return (
    <Link
      className="block my-48 leading-8 tracking-wide md:flex"
      to={hit.permalink}
    >
      <div className="flex-shrink-0 w-full mb-16 mr-20 font-serif font-bold md:mb-0 max-w-180 text-24">
        {hit.pageName}
      </div>
      <div className="flex-grow">
        <h2 className="font-serif font-bold text-24">
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
      <section className="w-full max-w-screen-xl mx-auto mt-48 leading-8 tracking-wide md:px-20">
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
