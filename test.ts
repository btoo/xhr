// Copyright 2021 Kitson P. Kelly. All rights reserved. MIT License.

import { assert } from "https://deno.land/std@0.199.0/assert/assert.ts";
import { assertThrows } from "https://deno.land/std@0.199.0/assert/assert_throws.ts";
import type {} from "./types.d.ts";

import "./mod.ts";

Deno.test({
  name: "globals defined",
  fn() {
    assert(typeof XMLHttpRequest === "function");
    assert(typeof XMLHttpRequestEventTarget === "function");
    assert(typeof XMLHttpRequestUpload === "function");
  },
});

Deno.test({
  name: "forbidden methods",
  fn() {
    const xhr = new XMLHttpRequest();
    assertThrows(
      () => {
        xhr.open("TRACE", "http://127.0.0.1");
      },
      DOMException,
      `The method "TRACE" is forbidden.`,
    );
  },
});

Deno.test({
  name: "non-standard methods work",
  fn() {
    const xhr = new XMLHttpRequest();
    xhr.open("CHICKEN", "http://127.0.0.1");
    xhr.abort();
  },
});
