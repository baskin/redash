import React from "react";
import { pick } from "lodash";
import HelpTrigger from "@/components/HelpTrigger";
import Link from "@/components/Link";
import { Renderer as VisRenderer, Editor as VisEditor, updateVisualizationsSettings } from "@redash/viz/lib";
import { clientConfig } from "@/services/auth";

import countriesDataUrl from "@redash/viz/lib/visualizations/choropleth/maps/countries.geo.json";
import usaDataUrl from "@redash/viz/lib/visualizations/choropleth/maps/usa-albers.geo.json";
import indiaStatesDataUrl from "@redash/viz/lib/visualizations/choropleth/maps/india.states.geo.json";
import indiaDistrictsDataUrl from "@redash/viz/lib/visualizations/choropleth/maps/india.districts.geo.json";
import subdivJapanDataUrl from "@redash/viz/lib/visualizations/choropleth/maps/japan.prefectures.geo.json";

function wrapComponentWithSettings(WrappedComponent) {
  return function VisualizationComponent(props) {
    updateVisualizationsSettings({
      HelpTriggerComponent: HelpTrigger,
      LinkComponent: Link,
      choroplethAvailableMaps: {
        countries: {
          name: "Countries",
          url: countriesDataUrl,
          fieldNames: {
            name: "Short name",
            name_long: "Full name",
            abbrev: "Abbreviated name",
            iso_a2: "ISO code (2 letters)",
            iso_a3: "ISO code (3 letters)",
            iso_n3: "ISO code (3 digits)",
          },
        },
        usa: {
            name: "USA",
            url: usaDataUrl,
            fieldNames: {
              name: "Name",
              ns_code: "National Standard ANSI Code (8-character)",
              geoid: "Geographic ID",
              usps_abbrev: "USPS Abbreviation",
              fips_code: "FIPS Code (2-character)",
            },
        },
        // { "id": "Mizoram", "st_nm": "Mizoram", "st_code": "15", "st_iso_3166-2": "MZ" }
        india_states: {
            name: "India/States",
            url: indiaStatesDataUrl,
            fieldNames: {
              st_name: "State name",
              st_code: "Numeric state code",
              'st_iso_3166-2': "2 digit state code in ISO-3166-2 format"
            }
        },
        // { "district": "Aizawl", "dt_code": "261", "st_nm": "Mizoram", "st_iso_3166-2": "MZ", "st_code": "15", "year": "2011_c" }
        india_districts: {
          name: "India/Districts",
          url: indiaDistrictsDataUrl,
          fieldNames: {
            district: "District name",
            dt_code: "Numeric district code",
            st_name: "State Name",
            st_code: "Numeric state code",
            'st_iso_3166-2': "2 digit state code in ISO-3166-2 format"
          },
        },
        subdiv_japan: {
          name: "Japan/Prefectures",
          url: subdivJapanDataUrl,
          fieldNames: {
            name: "Name",
            name_alt: "Name (alternative)",
            name_local: "Name (local)",
            iso_3166_2: "ISO-3166-2",
            postal: "Postal Code",
            type: "Type",
            type_en: "Type (EN)",
            region: "Region",
            region_code: "Region Code",
          },
        },
      },
      ...pick(clientConfig, [
        "dateFormat",
        "dateTimeFormat",
        "integerFormat",
        "floatFormat",
        "booleanValues",
        "tableCellMaxJSONSize",
        "allowCustomJSVisualizations",
        "hidePlotlyModeBar",
      ]),
    });

    return <WrappedComponent {...props} />;
  };
}

export const Renderer = wrapComponentWithSettings(VisRenderer);
export const Editor = wrapComponentWithSettings(VisEditor);
