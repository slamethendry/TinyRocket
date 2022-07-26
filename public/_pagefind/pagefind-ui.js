(() => {
  // node_modules/svelte/internal/index.mjs
  function noop() {
  }
  function run(fn) {
    return fn();
  }
  function blank_object() {
    return /* @__PURE__ */ Object.create(null);
  }
  function run_all(fns) {
    fns.forEach(run);
  }
  function is_function(thing) {
    return typeof thing === "function";
  }
  function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
  }
  var src_url_equal_anchor;
  function src_url_equal(element_src, url) {
    if (!src_url_equal_anchor) {
      src_url_equal_anchor = document.createElement("a");
    }
    src_url_equal_anchor.href = url;
    return element_src === src_url_equal_anchor.href;
  }
  function is_empty(obj) {
    return Object.keys(obj).length === 0;
  }
  var is_hydrating = false;
  function start_hydrating() {
    is_hydrating = true;
  }
  function end_hydrating() {
    is_hydrating = false;
  }
  function append(target, node) {
    target.appendChild(node);
  }
  function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
  }
  function detach(node) {
    node.parentNode.removeChild(node);
  }
  function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
      if (iterations[i])
        iterations[i].d(detaching);
    }
  }
  function element(name) {
    return document.createElement(name);
  }
  function text(data) {
    return document.createTextNode(data);
  }
  function space() {
    return text(" ");
  }
  function empty() {
    return text("");
  }
  function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
  }
  function attr(node, attribute, value) {
    if (value == null)
      node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
      node.setAttribute(attribute, value);
  }
  function children(element2) {
    return Array.from(element2.childNodes);
  }
  function set_data(text2, data) {
    data = "" + data;
    if (text2.wholeText !== data)
      text2.data = data;
  }
  function set_input_value(input, value) {
    input.value = value == null ? "" : value;
  }
  function toggle_class(element2, name, toggle) {
    element2.classList[toggle ? "add" : "remove"](name);
  }
  var current_component;
  function set_current_component(component) {
    current_component = component;
  }
  var dirty_components = [];
  var binding_callbacks = [];
  var render_callbacks = [];
  var flush_callbacks = [];
  var resolved_promise = Promise.resolve();
  var update_scheduled = false;
  function schedule_update() {
    if (!update_scheduled) {
      update_scheduled = true;
      resolved_promise.then(flush);
    }
  }
  function add_render_callback(fn) {
    render_callbacks.push(fn);
  }
  function add_flush_callback(fn) {
    flush_callbacks.push(fn);
  }
  var seen_callbacks = /* @__PURE__ */ new Set();
  var flushidx = 0;
  function flush() {
    const saved_component = current_component;
    do {
      while (flushidx < dirty_components.length) {
        const component = dirty_components[flushidx];
        flushidx++;
        set_current_component(component);
        update(component.$$);
      }
      set_current_component(null);
      dirty_components.length = 0;
      flushidx = 0;
      while (binding_callbacks.length)
        binding_callbacks.pop()();
      for (let i = 0; i < render_callbacks.length; i += 1) {
        const callback = render_callbacks[i];
        if (!seen_callbacks.has(callback)) {
          seen_callbacks.add(callback);
          callback();
        }
      }
      render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
      flush_callbacks.pop()();
    }
    update_scheduled = false;
    seen_callbacks.clear();
    set_current_component(saved_component);
  }
  function update($$) {
    if ($$.fragment !== null) {
      $$.update();
      run_all($$.before_update);
      const dirty = $$.dirty;
      $$.dirty = [-1];
      $$.fragment && $$.fragment.p($$.ctx, dirty);
      $$.after_update.forEach(add_render_callback);
    }
  }
  var outroing = /* @__PURE__ */ new Set();
  var outros;
  function group_outros() {
    outros = {
      r: 0,
      c: [],
      p: outros
    };
  }
  function check_outros() {
    if (!outros.r) {
      run_all(outros.c);
    }
    outros = outros.p;
  }
  function transition_in(block, local) {
    if (block && block.i) {
      outroing.delete(block);
      block.i(local);
    }
  }
  function transition_out(block, local, detach2, callback) {
    if (block && block.o) {
      if (outroing.has(block))
        return;
      outroing.add(block);
      outros.c.push(() => {
        outroing.delete(block);
        if (callback) {
          if (detach2)
            block.d(1);
          callback();
        }
      });
      block.o(local);
    }
  }
  var globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : global;
  function outro_and_destroy_block(block, lookup) {
    transition_out(block, 1, 1, () => {
      lookup.delete(block.key);
    });
  }
  function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block4, next, get_context) {
    let o = old_blocks.length;
    let n = list.length;
    let i = o;
    const old_indexes = {};
    while (i--)
      old_indexes[old_blocks[i].key] = i;
    const new_blocks = [];
    const new_lookup = /* @__PURE__ */ new Map();
    const deltas = /* @__PURE__ */ new Map();
    i = n;
    while (i--) {
      const child_ctx = get_context(ctx, list, i);
      const key = get_key(child_ctx);
      let block = lookup.get(key);
      if (!block) {
        block = create_each_block4(key, child_ctx);
        block.c();
      } else if (dynamic) {
        block.p(child_ctx, dirty);
      }
      new_lookup.set(key, new_blocks[i] = block);
      if (key in old_indexes)
        deltas.set(key, Math.abs(i - old_indexes[key]));
    }
    const will_move = /* @__PURE__ */ new Set();
    const did_move = /* @__PURE__ */ new Set();
    function insert2(block) {
      transition_in(block, 1);
      block.m(node, next);
      lookup.set(block.key, block);
      next = block.first;
      n--;
    }
    while (o && n) {
      const new_block = new_blocks[n - 1];
      const old_block = old_blocks[o - 1];
      const new_key = new_block.key;
      const old_key = old_block.key;
      if (new_block === old_block) {
        next = new_block.first;
        o--;
        n--;
      } else if (!new_lookup.has(old_key)) {
        destroy(old_block, lookup);
        o--;
      } else if (!lookup.has(new_key) || will_move.has(new_key)) {
        insert2(new_block);
      } else if (did_move.has(old_key)) {
        o--;
      } else if (deltas.get(new_key) > deltas.get(old_key)) {
        did_move.add(new_key);
        insert2(new_block);
      } else {
        will_move.add(old_key);
        o--;
      }
    }
    while (o--) {
      const old_block = old_blocks[o];
      if (!new_lookup.has(old_block.key))
        destroy(old_block, lookup);
    }
    while (n)
      insert2(new_blocks[n - 1]);
    return new_blocks;
  }
  function bind(component, name, callback) {
    const index = component.$$.props[name];
    if (index !== void 0) {
      component.$$.bound[index] = callback;
      callback(component.$$.ctx[index]);
    }
  }
  function create_component(block) {
    block && block.c();
  }
  function mount_component(component, target, anchor, customElement) {
    const { fragment, on_mount, on_destroy, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    if (!customElement) {
      add_render_callback(() => {
        const new_on_destroy = on_mount.map(run).filter(is_function);
        if (on_destroy) {
          on_destroy.push(...new_on_destroy);
        } else {
          run_all(new_on_destroy);
        }
        component.$$.on_mount = [];
      });
    }
    after_update.forEach(add_render_callback);
  }
  function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
      run_all($$.on_destroy);
      $$.fragment && $$.fragment.d(detaching);
      $$.on_destroy = $$.fragment = null;
      $$.ctx = [];
    }
  }
  function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
      dirty_components.push(component);
      schedule_update();
      component.$$.dirty.fill(0);
    }
    component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
  }
  function init(component, options, instance4, create_fragment4, not_equal, props, append_styles, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
      fragment: null,
      ctx: null,
      props,
      update: noop,
      not_equal,
      bound: blank_object(),
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
      callbacks: blank_object(),
      dirty,
      skip_bound: false,
      root: options.target || parent_component.$$.root
    };
    append_styles && append_styles($$.root);
    let ready = false;
    $$.ctx = instance4 ? instance4(component, options.props || {}, (i, ret, ...rest) => {
      const value = rest.length ? rest[0] : ret;
      if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
        if (!$$.skip_bound && $$.bound[i])
          $$.bound[i](value);
        if (ready)
          make_dirty(component, i);
      }
      return ret;
    }) : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    $$.fragment = create_fragment4 ? create_fragment4($$.ctx) : false;
    if (options.target) {
      if (options.hydrate) {
        start_hydrating();
        const nodes = children(options.target);
        $$.fragment && $$.fragment.l(nodes);
        nodes.forEach(detach);
      } else {
        $$.fragment && $$.fragment.c();
      }
      if (options.intro)
        transition_in(component.$$.fragment);
      mount_component(component, options.target, options.anchor, options.customElement);
      end_hydrating();
      flush();
    }
    set_current_component(parent_component);
  }
  var SvelteElement;
  if (typeof HTMLElement === "function") {
    SvelteElement = class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" });
      }
      connectedCallback() {
        const { on_mount } = this.$$;
        this.$$.on_disconnect = on_mount.map(run).filter(is_function);
        for (const key in this.$$.slotted) {
          this.appendChild(this.$$.slotted[key]);
        }
      }
      attributeChangedCallback(attr2, _oldValue, newValue) {
        this[attr2] = newValue;
      }
      disconnectedCallback() {
        run_all(this.$$.on_disconnect);
      }
      $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
      }
      $on(type, callback) {
        const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
        callbacks.push(callback);
        return () => {
          const index = callbacks.indexOf(callback);
          if (index !== -1)
            callbacks.splice(index, 1);
        };
      }
      $set($$props) {
        if (this.$$set && !is_empty($$props)) {
          this.$$.skip_bound = true;
          this.$$set($$props);
          this.$$.skip_bound = false;
        }
      }
    };
  }
  var SvelteComponent = class {
    $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop;
    }
    $on(type, callback) {
      const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return () => {
        const index = callbacks.indexOf(callback);
        if (index !== -1)
          callbacks.splice(index, 1);
      };
    }
    $set($$props) {
      if (this.$$set && !is_empty($$props)) {
        this.$$.skip_bound = true;
        this.$$set($$props);
        this.$$.skip_bound = false;
      }
    }
  };

  // svelte/result.svelte
  function get_each_context(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[6] = list[i][0];
    child_ctx[7] = list[i][1];
    return child_ctx;
  }
  function create_else_block(ctx) {
    let div0;
    let t0;
    let div1;
    let p0;
    let t2;
    let p1;
    return {
      c() {
        div0 = element("div");
        t0 = space();
        div1 = element("div");
        p0 = element("p");
        p0.textContent = `${ctx[2](30)}`;
        t2 = space();
        p1 = element("p");
        p1.textContent = `${ctx[2](40)}`;
        attr(div0, "class", "pagefind-ui__result-thumb pagefind-ui__loading svelte-j9e30");
        attr(p0, "class", "pagefind-ui__result-title pagefind-ui__loading svelte-j9e30");
        attr(p1, "class", "pagefind-ui__result-excerpt pagefind-ui__loading svelte-j9e30");
        attr(div1, "class", "pagefind-ui__result-inner svelte-j9e30");
      },
      m(target, anchor) {
        insert(target, div0, anchor);
        insert(target, t0, anchor);
        insert(target, div1, anchor);
        append(div1, p0);
        append(div1, t2);
        append(div1, p1);
      },
      p: noop,
      d(detaching) {
        if (detaching)
          detach(div0);
        if (detaching)
          detach(t0);
        if (detaching)
          detach(div1);
      }
    };
  }
  function create_if_block(ctx) {
    let div0;
    let t0;
    let div1;
    let p0;
    let a;
    let t1_value = ctx[0].meta?.title + "";
    let t1;
    let a_href_value;
    let t2;
    let p1;
    let raw_value = ctx[0].excerpt + "";
    let t3;
    let if_block0 = ctx[0].meta.image && create_if_block_2(ctx);
    let if_block1 = ctx[1].length && create_if_block_1(ctx);
    return {
      c() {
        div0 = element("div");
        if (if_block0)
          if_block0.c();
        t0 = space();
        div1 = element("div");
        p0 = element("p");
        a = element("a");
        t1 = text(t1_value);
        t2 = space();
        p1 = element("p");
        t3 = space();
        if (if_block1)
          if_block1.c();
        attr(div0, "class", "pagefind-ui__result-thumb svelte-j9e30");
        attr(a, "class", "pagefind-ui__result-link svelte-j9e30");
        attr(a, "href", a_href_value = ctx[0].url);
        attr(p0, "class", "pagefind-ui__result-title svelte-j9e30");
        attr(p1, "class", "pagefind-ui__result-excerpt svelte-j9e30");
        attr(div1, "class", "pagefind-ui__result-inner svelte-j9e30");
      },
      m(target, anchor) {
        insert(target, div0, anchor);
        if (if_block0)
          if_block0.m(div0, null);
        insert(target, t0, anchor);
        insert(target, div1, anchor);
        append(div1, p0);
        append(p0, a);
        append(a, t1);
        append(div1, t2);
        append(div1, p1);
        p1.innerHTML = raw_value;
        append(div1, t3);
        if (if_block1)
          if_block1.m(div1, null);
      },
      p(ctx2, dirty) {
        if (ctx2[0].meta.image) {
          if (if_block0) {
            if_block0.p(ctx2, dirty);
          } else {
            if_block0 = create_if_block_2(ctx2);
            if_block0.c();
            if_block0.m(div0, null);
          }
        } else if (if_block0) {
          if_block0.d(1);
          if_block0 = null;
        }
        if (dirty & 1 && t1_value !== (t1_value = ctx2[0].meta?.title + ""))
          set_data(t1, t1_value);
        if (dirty & 1 && a_href_value !== (a_href_value = ctx2[0].url)) {
          attr(a, "href", a_href_value);
        }
        if (dirty & 1 && raw_value !== (raw_value = ctx2[0].excerpt + ""))
          p1.innerHTML = raw_value;
        ;
        if (ctx2[1].length) {
          if (if_block1) {
            if_block1.p(ctx2, dirty);
          } else {
            if_block1 = create_if_block_1(ctx2);
            if_block1.c();
            if_block1.m(div1, null);
          }
        } else if (if_block1) {
          if_block1.d(1);
          if_block1 = null;
        }
      },
      d(detaching) {
        if (detaching)
          detach(div0);
        if (if_block0)
          if_block0.d();
        if (detaching)
          detach(t0);
        if (detaching)
          detach(div1);
        if (if_block1)
          if_block1.d();
      }
    };
  }
  function create_if_block_2(ctx) {
    let img;
    let img_src_value;
    let img_alt_value;
    return {
      c() {
        img = element("img");
        attr(img, "class", "pagefind-ui__result-image svelte-j9e30");
        if (!src_url_equal(img.src, img_src_value = ctx[0].meta?.image))
          attr(img, "src", img_src_value);
        attr(img, "alt", img_alt_value = ctx[0].meta?.image_alt || ctx[0].meta?.title);
      },
      m(target, anchor) {
        insert(target, img, anchor);
      },
      p(ctx2, dirty) {
        if (dirty & 1 && !src_url_equal(img.src, img_src_value = ctx2[0].meta?.image)) {
          attr(img, "src", img_src_value);
        }
        if (dirty & 1 && img_alt_value !== (img_alt_value = ctx2[0].meta?.image_alt || ctx2[0].meta?.title)) {
          attr(img, "alt", img_alt_value);
        }
      },
      d(detaching) {
        if (detaching)
          detach(img);
      }
    };
  }
  function create_if_block_1(ctx) {
    let ul;
    let each_value = ctx[1];
    let each_blocks = [];
    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    }
    return {
      c() {
        ul = element("ul");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        attr(ul, "class", "pagefind-ui__result-tags svelte-j9e30");
      },
      m(target, anchor) {
        insert(target, ul, anchor);
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].m(ul, null);
        }
      },
      p(ctx2, dirty) {
        if (dirty & 2) {
          each_value = ctx2[1];
          let i;
          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context(ctx2, each_value, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
            } else {
              each_blocks[i] = create_each_block(child_ctx);
              each_blocks[i].c();
              each_blocks[i].m(ul, null);
            }
          }
          for (; i < each_blocks.length; i += 1) {
            each_blocks[i].d(1);
          }
          each_blocks.length = each_value.length;
        }
      },
      d(detaching) {
        if (detaching)
          detach(ul);
        destroy_each(each_blocks, detaching);
      }
    };
  }
  function create_each_block(ctx) {
    let li;
    let t0_value = ctx[6].replace(/^(\w)/, func) + "";
    let t0;
    let t1;
    let t2_value = ctx[7] + "";
    let t2;
    let t3;
    return {
      c() {
        li = element("li");
        t0 = text(t0_value);
        t1 = text(": ");
        t2 = text(t2_value);
        t3 = space();
        attr(li, "class", "pagefind-ui__result-tag svelte-j9e30");
      },
      m(target, anchor) {
        insert(target, li, anchor);
        append(li, t0);
        append(li, t1);
        append(li, t2);
        append(li, t3);
      },
      p(ctx2, dirty) {
        if (dirty & 2 && t0_value !== (t0_value = ctx2[6].replace(/^(\w)/, func) + ""))
          set_data(t0, t0_value);
        if (dirty & 2 && t2_value !== (t2_value = ctx2[7] + ""))
          set_data(t2, t2_value);
      },
      d(detaching) {
        if (detaching)
          detach(li);
      }
    };
  }
  function create_fragment(ctx) {
    let li;
    function select_block_type(ctx2, dirty) {
      if (ctx2[0])
        return create_if_block;
      return create_else_block;
    }
    let current_block_type = select_block_type(ctx, -1);
    let if_block = current_block_type(ctx);
    return {
      c() {
        li = element("li");
        if_block.c();
        attr(li, "class", "pagefind-ui__result svelte-j9e30");
      },
      m(target, anchor) {
        insert(target, li, anchor);
        if_block.m(li, null);
      },
      p(ctx2, [dirty]) {
        if (current_block_type === (current_block_type = select_block_type(ctx2, dirty)) && if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block.d(1);
          if_block = current_block_type(ctx2);
          if (if_block) {
            if_block.c();
            if_block.m(li, null);
          }
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching)
          detach(li);
        if_block.d();
      }
    };
  }
  var func = (c) => c.toLocaleUpperCase();
  function instance($$self, $$props, $$invalidate) {
    let { result = {
      data: async () => {
      }
    } } = $$props;
    const skipMeta = ["title", "image", "image_alt"];
    let data;
    let meta = [];
    const load = async (r) => {
      $$invalidate(0, data = await r.data());
      $$invalidate(1, meta = Object.entries(data.meta).filter(([key]) => !skipMeta.includes(key)));
    };
    const placeholder = (max = 30) => {
      return ". ".repeat(Math.floor(10 + Math.random() * max));
    };
    $$self.$$set = ($$props2) => {
      if ("result" in $$props2)
        $$invalidate(3, result = $$props2.result);
    };
    $$self.$$.update = () => {
      if ($$self.$$.dirty & 8) {
        $:
          load(result);
      }
    };
    return [data, meta, placeholder, result];
  }
  var Result = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance, create_fragment, safe_not_equal, { result: 3 });
    }
  };
  var result_default = Result;

  // svelte/filters.svelte
  function get_each_context2(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[3] = list[i][0];
    child_ctx[4] = list[i][1];
    child_ctx[5] = list;
    child_ctx[6] = i;
    return child_ctx;
  }
  function get_each_context_1(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[7] = list[i][0];
    child_ctx[8] = list[i][1];
    child_ctx[9] = list;
    child_ctx[10] = i;
    return child_ctx;
  }
  function create_if_block2(ctx) {
    let fieldset;
    let legend;
    let t1;
    function select_block_type(ctx2, dirty) {
      if (ctx2[1])
        return create_if_block_12;
      return create_else_block2;
    }
    let current_block_type = select_block_type(ctx, -1);
    let if_block = current_block_type(ctx);
    return {
      c() {
        fieldset = element("fieldset");
        legend = element("legend");
        legend.textContent = "Filters";
        t1 = space();
        if_block.c();
        attr(legend, "class", "pagefind-ui__filter-panel-label svelte-1disgtf");
        attr(fieldset, "class", "pagefind-ui__filter-panel svelte-1disgtf");
      },
      m(target, anchor) {
        insert(target, fieldset, anchor);
        append(fieldset, legend);
        append(fieldset, t1);
        if_block.m(fieldset, null);
      },
      p(ctx2, dirty) {
        if (current_block_type === (current_block_type = select_block_type(ctx2, dirty)) && if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block.d(1);
          if_block = current_block_type(ctx2);
          if (if_block) {
            if_block.c();
            if_block.m(fieldset, null);
          }
        }
      },
      d(detaching) {
        if (detaching)
          detach(fieldset);
        if_block.d();
      }
    };
  }
  function create_else_block2(ctx) {
    let p;
    return {
      c() {
        p = element("p");
        p.textContent = "..........";
        attr(p, "class", "pagefind-ui__loading svelte-1disgtf");
      },
      m(target, anchor) {
        insert(target, p, anchor);
      },
      p: noop,
      d(detaching) {
        if (detaching)
          detach(p);
      }
    };
  }
  function create_if_block_12(ctx) {
    let each_1_anchor;
    let each_value = Object.entries(ctx[1]);
    let each_blocks = [];
    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block2(get_each_context2(ctx, each_value, i));
    }
    return {
      c() {
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        each_1_anchor = empty();
      },
      m(target, anchor) {
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].m(target, anchor);
        }
        insert(target, each_1_anchor, anchor);
      },
      p(ctx2, dirty) {
        if (dirty & 3) {
          each_value = Object.entries(ctx2[1]);
          let i;
          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context2(ctx2, each_value, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
            } else {
              each_blocks[i] = create_each_block2(child_ctx);
              each_blocks[i].c();
              each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
            }
          }
          for (; i < each_blocks.length; i += 1) {
            each_blocks[i].d(1);
          }
          each_blocks.length = each_value.length;
        }
      },
      d(detaching) {
        destroy_each(each_blocks, detaching);
        if (detaching)
          detach(each_1_anchor);
      }
    };
  }
  function create_each_block_1(ctx) {
    let div;
    let input;
    let input_id_value;
    let input_name_value;
    let input_value_value;
    let t0;
    let label;
    let t1_value = ctx[7] + "";
    let t1;
    let t2;
    let t3_value = ctx[8] + "";
    let t3;
    let t4;
    let label_for_value;
    let t5;
    let mounted;
    let dispose;
    function input_change_handler() {
      ctx[2].call(input, ctx[3], ctx[7]);
    }
    return {
      c() {
        div = element("div");
        input = element("input");
        t0 = space();
        label = element("label");
        t1 = text(t1_value);
        t2 = text(" (");
        t3 = text(t3_value);
        t4 = text(")");
        t5 = space();
        attr(input, "class", "pagefind-ui__filter-checkbox svelte-1disgtf");
        attr(input, "type", "checkbox");
        attr(input, "id", input_id_value = ctx[3] + "-" + ctx[7]);
        attr(input, "name", input_name_value = ctx[3]);
        input.__value = input_value_value = ctx[7];
        input.value = input.__value;
        attr(label, "class", "pagefind-ui__filter-label svelte-1disgtf");
        attr(label, "for", label_for_value = ctx[3] + "-" + ctx[7]);
        attr(div, "class", "pagefind-ui__filter-value svelte-1disgtf");
        toggle_class(div, "pagefind-ui__filter-value--checked", ctx[0][`${ctx[3]}:${ctx[7]}`]);
      },
      m(target, anchor) {
        insert(target, div, anchor);
        append(div, input);
        input.checked = ctx[0][`${ctx[3]}:${ctx[7]}`];
        append(div, t0);
        append(div, label);
        append(label, t1);
        append(label, t2);
        append(label, t3);
        append(label, t4);
        append(div, t5);
        if (!mounted) {
          dispose = listen(input, "change", input_change_handler);
          mounted = true;
        }
      },
      p(new_ctx, dirty) {
        ctx = new_ctx;
        if (dirty & 2 && input_id_value !== (input_id_value = ctx[3] + "-" + ctx[7])) {
          attr(input, "id", input_id_value);
        }
        if (dirty & 2 && input_name_value !== (input_name_value = ctx[3])) {
          attr(input, "name", input_name_value);
        }
        if (dirty & 2 && input_value_value !== (input_value_value = ctx[7])) {
          input.__value = input_value_value;
          input.value = input.__value;
        }
        if (dirty & 3) {
          input.checked = ctx[0][`${ctx[3]}:${ctx[7]}`];
        }
        if (dirty & 2 && t1_value !== (t1_value = ctx[7] + ""))
          set_data(t1, t1_value);
        if (dirty & 2 && t3_value !== (t3_value = ctx[8] + ""))
          set_data(t3, t3_value);
        if (dirty & 2 && label_for_value !== (label_for_value = ctx[3] + "-" + ctx[7])) {
          attr(label, "for", label_for_value);
        }
        if (dirty & 3) {
          toggle_class(div, "pagefind-ui__filter-value--checked", ctx[0][`${ctx[3]}:${ctx[7]}`]);
        }
      },
      d(detaching) {
        if (detaching)
          detach(div);
        mounted = false;
        dispose();
      }
    };
  }
  function create_each_block2(ctx) {
    let details;
    let summary;
    let t0_value = ctx[3].replace(/^(\w)/, func2) + "";
    let t0;
    let t1;
    let fieldset;
    let legend;
    let t2_value = ctx[3] + "";
    let t2;
    let t3;
    let t4;
    let each_value_1 = Object.entries(ctx[4]);
    let each_blocks = [];
    for (let i = 0; i < each_value_1.length; i += 1) {
      each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    }
    return {
      c() {
        details = element("details");
        summary = element("summary");
        t0 = text(t0_value);
        t1 = space();
        fieldset = element("fieldset");
        legend = element("legend");
        t2 = text(t2_value);
        t3 = space();
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        t4 = space();
        attr(summary, "class", "pagefind-ui__filter-name svelte-1disgtf");
        attr(legend, "class", "pagefind-ui__filter-group-label svelte-1disgtf");
        attr(fieldset, "class", "pagefind-ui__filter-group svelte-1disgtf");
        attr(details, "class", "pagefind-ui__filter-block svelte-1disgtf");
      },
      m(target, anchor) {
        insert(target, details, anchor);
        append(details, summary);
        append(summary, t0);
        append(details, t1);
        append(details, fieldset);
        append(fieldset, legend);
        append(legend, t2);
        append(fieldset, t3);
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].m(fieldset, null);
        }
        append(details, t4);
      },
      p(ctx2, dirty) {
        if (dirty & 2 && t0_value !== (t0_value = ctx2[3].replace(/^(\w)/, func2) + ""))
          set_data(t0, t0_value);
        if (dirty & 2 && t2_value !== (t2_value = ctx2[3] + ""))
          set_data(t2, t2_value);
        if (dirty & 3) {
          each_value_1 = Object.entries(ctx2[4]);
          let i;
          for (i = 0; i < each_value_1.length; i += 1) {
            const child_ctx = get_each_context_1(ctx2, each_value_1, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
            } else {
              each_blocks[i] = create_each_block_1(child_ctx);
              each_blocks[i].c();
              each_blocks[i].m(fieldset, null);
            }
          }
          for (; i < each_blocks.length; i += 1) {
            each_blocks[i].d(1);
          }
          each_blocks.length = each_value_1.length;
        }
      },
      d(detaching) {
        if (detaching)
          detach(details);
        destroy_each(each_blocks, detaching);
      }
    };
  }
  function create_fragment2(ctx) {
    let show_if = !ctx[1] || Object.entries(ctx[1]).length;
    let if_block_anchor;
    let if_block = show_if && create_if_block2(ctx);
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
      },
      p(ctx2, [dirty]) {
        if (dirty & 2)
          show_if = !ctx2[1] || Object.entries(ctx2[1]).length;
        if (show_if) {
          if (if_block) {
            if_block.p(ctx2, dirty);
          } else {
            if_block = create_if_block2(ctx2);
            if_block.c();
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          if_block.d(1);
          if_block = null;
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (if_block)
          if_block.d(detaching);
        if (detaching)
          detach(if_block_anchor);
      }
    };
  }
  var func2 = (c) => c.toLocaleUpperCase();
  function instance2($$self, $$props, $$invalidate) {
    let { available_filters = null } = $$props;
    const selected_filters = {};
    function input_change_handler(filter, value) {
      selected_filters[`${filter}:${value}`] = this.checked;
      $$invalidate(0, selected_filters);
    }
    $$self.$$set = ($$props2) => {
      if ("available_filters" in $$props2)
        $$invalidate(1, available_filters = $$props2.available_filters);
    };
    return [selected_filters, available_filters, input_change_handler];
  }
  var Filters = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance2, create_fragment2, safe_not_equal, {
        available_filters: 1,
        selected_filters: 0
      });
    }
    get selected_filters() {
      return this.$$.ctx[0];
    }
  };
  var filters_default = Filters;

  // svelte/ui.svelte
  function get_each_context3(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[22] = list[i];
    return child_ctx;
  }
  function create_if_block3(ctx) {
    let t;
    let div;
    let current_block_type_index;
    let if_block1;
    let current;
    let if_block0 = ctx[3] && create_if_block_4(ctx);
    const if_block_creators = [create_if_block_13, create_else_block_1];
    const if_blocks = [];
    function select_block_type(ctx2, dirty) {
      if (ctx2[5])
        return 0;
      return 1;
    }
    current_block_type_index = select_block_type(ctx, -1);
    if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    return {
      c() {
        if (if_block0)
          if_block0.c();
        t = space();
        div = element("div");
        if_block1.c();
        attr(div, "class", "pagefind-ui__results-area svelte-19uh7sf");
      },
      m(target, anchor) {
        if (if_block0)
          if_block0.m(target, anchor);
        insert(target, t, anchor);
        insert(target, div, anchor);
        if_blocks[current_block_type_index].m(div, null);
        current = true;
      },
      p(ctx2, dirty) {
        if (ctx2[3]) {
          if (if_block0) {
            if_block0.p(ctx2, dirty);
            if (dirty & 8) {
              transition_in(if_block0, 1);
            }
          } else {
            if_block0 = create_if_block_4(ctx2);
            if_block0.c();
            transition_in(if_block0, 1);
            if_block0.m(t.parentNode, t);
          }
        } else if (if_block0) {
          group_outros();
          transition_out(if_block0, 1, 1, () => {
            if_block0 = null;
          });
          check_outros();
        }
        let previous_block_index = current_block_type_index;
        current_block_type_index = select_block_type(ctx2, dirty);
        if (current_block_type_index === previous_block_index) {
          if_blocks[current_block_type_index].p(ctx2, dirty);
        } else {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
          if_block1 = if_blocks[current_block_type_index];
          if (!if_block1) {
            if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block1.c();
          } else {
            if_block1.p(ctx2, dirty);
          }
          transition_in(if_block1, 1);
          if_block1.m(div, null);
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block0);
        transition_in(if_block1);
        current = true;
      },
      o(local) {
        transition_out(if_block0);
        transition_out(if_block1);
        current = false;
      },
      d(detaching) {
        if (if_block0)
          if_block0.d(detaching);
        if (detaching)
          detach(t);
        if (detaching)
          detach(div);
        if_blocks[current_block_type_index].d();
      }
    };
  }
  function create_if_block_4(ctx) {
    let filters;
    let updating_selected_filters;
    let current;
    function filters_selected_filters_binding(value) {
      ctx[15](value);
    }
    let filters_props = {
      available_filters: ctx[9]
    };
    if (ctx[2] !== void 0) {
      filters_props.selected_filters = ctx[2];
    }
    filters = new filters_default({ props: filters_props });
    binding_callbacks.push(() => bind(filters, "selected_filters", filters_selected_filters_binding));
    return {
      c() {
        create_component(filters.$$.fragment);
      },
      m(target, anchor) {
        mount_component(filters, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const filters_changes = {};
        if (dirty & 512)
          filters_changes.available_filters = ctx2[9];
        if (!updating_selected_filters && dirty & 4) {
          updating_selected_filters = true;
          filters_changes.selected_filters = ctx2[2];
          add_flush_callback(() => updating_selected_filters = false);
        }
        filters.$set(filters_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(filters.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(filters.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(filters, detaching);
      }
    };
  }
  function create_else_block_1(ctx) {
    let p;
    let t0_value = ctx[4].results.length + "";
    let t0;
    let t1;
    let t2_value = ctx[4].results.length === 1 ? "" : "s";
    let t2;
    let t3;
    let t4_value = ctx[7] ? `for "${ctx[7].replace(/^"+|"+$/g, "")}"` : "";
    let t4;
    let t5;
    let ol;
    let each_blocks = [];
    let each_1_lookup = /* @__PURE__ */ new Map();
    let t6;
    let if_block_anchor;
    let current;
    let each_value = ctx[4].results.slice(0, ctx[8]);
    const get_key = (ctx2) => ctx2[22].id;
    for (let i = 0; i < each_value.length; i += 1) {
      let child_ctx = get_each_context3(ctx, each_value, i);
      let key = get_key(child_ctx);
      each_1_lookup.set(key, each_blocks[i] = create_each_block3(key, child_ctx));
    }
    let if_block = ctx[4].results.length > ctx[8] && create_if_block_3(ctx);
    return {
      c() {
        p = element("p");
        t0 = text(t0_value);
        t1 = text(" result");
        t2 = text(t2_value);
        t3 = space();
        t4 = text(t4_value);
        t5 = space();
        ol = element("ol");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        t6 = space();
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
        attr(p, "class", "pagefind-ui__message svelte-19uh7sf");
        attr(ol, "class", "pagefind-ui__results svelte-19uh7sf");
      },
      m(target, anchor) {
        insert(target, p, anchor);
        append(p, t0);
        append(p, t1);
        append(p, t2);
        append(p, t3);
        append(p, t4);
        insert(target, t5, anchor);
        insert(target, ol, anchor);
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].m(ol, null);
        }
        insert(target, t6, anchor);
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if ((!current || dirty & 16) && t0_value !== (t0_value = ctx2[4].results.length + ""))
          set_data(t0, t0_value);
        if ((!current || dirty & 16) && t2_value !== (t2_value = ctx2[4].results.length === 1 ? "" : "s"))
          set_data(t2, t2_value);
        if ((!current || dirty & 128) && t4_value !== (t4_value = ctx2[7] ? `for "${ctx2[7].replace(/^"+|"+$/g, "")}"` : ""))
          set_data(t4, t4_value);
        if (dirty & 272) {
          each_value = ctx2[4].results.slice(0, ctx2[8]);
          group_outros();
          each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx2, each_value, each_1_lookup, ol, outro_and_destroy_block, create_each_block3, null, get_each_context3);
          check_outros();
        }
        if (ctx2[4].results.length > ctx2[8]) {
          if (if_block) {
            if_block.p(ctx2, dirty);
          } else {
            if_block = create_if_block_3(ctx2);
            if_block.c();
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          if_block.d(1);
          if_block = null;
        }
      },
      i(local) {
        if (current)
          return;
        for (let i = 0; i < each_value.length; i += 1) {
          transition_in(each_blocks[i]);
        }
        current = true;
      },
      o(local) {
        for (let i = 0; i < each_blocks.length; i += 1) {
          transition_out(each_blocks[i]);
        }
        current = false;
      },
      d(detaching) {
        if (detaching)
          detach(p);
        if (detaching)
          detach(t5);
        if (detaching)
          detach(ol);
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].d();
        }
        if (detaching)
          detach(t6);
        if (if_block)
          if_block.d(detaching);
        if (detaching)
          detach(if_block_anchor);
      }
    };
  }
  function create_if_block_13(ctx) {
    let if_block_anchor;
    function select_block_type_1(ctx2, dirty) {
      if (ctx2[7])
        return create_if_block_22;
      return create_else_block3;
    }
    let current_block_type = select_block_type_1(ctx, -1);
    let if_block = current_block_type(ctx);
    return {
      c() {
        if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
      },
      p(ctx2, dirty) {
        if (current_block_type === (current_block_type = select_block_type_1(ctx2, dirty)) && if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block.d(1);
          if_block = current_block_type(ctx2);
          if (if_block) {
            if_block.c();
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if_block.d(detaching);
        if (detaching)
          detach(if_block_anchor);
      }
    };
  }
  function create_each_block3(key_1, ctx) {
    let first;
    let result;
    let current;
    result = new result_default({ props: { result: ctx[22] } });
    return {
      key: key_1,
      first: null,
      c() {
        first = empty();
        create_component(result.$$.fragment);
        this.first = first;
      },
      m(target, anchor) {
        insert(target, first, anchor);
        mount_component(result, target, anchor);
        current = true;
      },
      p(new_ctx, dirty) {
        ctx = new_ctx;
        const result_changes = {};
        if (dirty & 272)
          result_changes.result = ctx[22];
        result.$set(result_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(result.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(result.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching)
          detach(first);
        destroy_component(result, detaching);
      }
    };
  }
  function create_if_block_3(ctx) {
    let button;
    let mounted;
    let dispose;
    return {
      c() {
        button = element("button");
        button.textContent = "Load more results";
        attr(button, "class", "pagefind-ui__button svelte-19uh7sf");
      },
      m(target, anchor) {
        insert(target, button, anchor);
        if (!mounted) {
          dispose = listen(button, "click", ctx[11]);
          mounted = true;
        }
      },
      p: noop,
      d(detaching) {
        if (detaching)
          detach(button);
        mounted = false;
        dispose();
      }
    };
  }
  function create_else_block3(ctx) {
    let p;
    return {
      c() {
        p = element("p");
        p.textContent = "Filtering...";
        attr(p, "class", "pagefind-ui__message svelte-19uh7sf");
      },
      m(target, anchor) {
        insert(target, p, anchor);
      },
      p: noop,
      d(detaching) {
        if (detaching)
          detach(p);
      }
    };
  }
  function create_if_block_22(ctx) {
    let p;
    let t0;
    let t1_value = ctx[7].replace(/^"+|"+$/g, "") + "";
    let t1;
    let t2;
    return {
      c() {
        p = element("p");
        t0 = text('Searching for "');
        t1 = text(t1_value);
        t2 = text('"...');
        attr(p, "class", "pagefind-ui__message svelte-19uh7sf");
      },
      m(target, anchor) {
        insert(target, p, anchor);
        append(p, t0);
        append(p, t1);
        append(p, t2);
      },
      p(ctx2, dirty) {
        if (dirty & 128 && t1_value !== (t1_value = ctx2[7].replace(/^"+|"+$/g, "") + ""))
          set_data(t1, t1_value);
      },
      d(detaching) {
        if (detaching)
          detach(p);
      }
    };
  }
  function create_fragment3(ctx) {
    let div1;
    let form;
    let input;
    let t;
    let div0;
    let current;
    let mounted;
    let dispose;
    let if_block = ctx[6] && create_if_block3(ctx);
    return {
      c() {
        div1 = element("div");
        form = element("form");
        input = element("input");
        t = space();
        div0 = element("div");
        if (if_block)
          if_block.c();
        attr(input, "class", "pagefind-ui__search-input svelte-19uh7sf");
        attr(input, "type", "text");
        attr(input, "placeholder", "Search");
        attr(div0, "class", "pagefind-ui__drawer svelte-19uh7sf");
        attr(form, "class", "pagefind-ui__form svelte-19uh7sf");
        attr(form, "role", "search");
        attr(form, "aria-label", "Search this site");
        attr(form, "action", "javascript:void(0);");
        attr(div1, "class", "pagefind-ui svelte-19uh7sf");
        toggle_class(div1, "pagefind-ui--reset", ctx[0]);
      },
      m(target, anchor) {
        insert(target, div1, anchor);
        append(div1, form);
        append(form, input);
        set_input_value(input, ctx[1]);
        append(form, t);
        append(form, div0);
        if (if_block)
          if_block.m(div0, null);
        current = true;
        if (!mounted) {
          dispose = [
            listen(input, "focus", ctx[10]),
            listen(input, "input", ctx[14])
          ];
          mounted = true;
        }
      },
      p(ctx2, [dirty]) {
        if (dirty & 2 && input.value !== ctx2[1]) {
          set_input_value(input, ctx2[1]);
        }
        if (ctx2[6]) {
          if (if_block) {
            if_block.p(ctx2, dirty);
            if (dirty & 64) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block3(ctx2);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(div0, null);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, () => {
            if_block = null;
          });
          check_outros();
        }
        if (dirty & 1) {
          toggle_class(div1, "pagefind-ui--reset", ctx2[0]);
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching)
          detach(div1);
        if (if_block)
          if_block.d();
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function instance3($$self, $$props, $$invalidate) {
    let { base_path = "/_pagefind/" } = $$props;
    let { reset_styles = true } = $$props;
    let { pagefind_options = {} } = $$props;
    let val = "";
    let pagefind;
    let initializing = false;
    let searchResult = [];
    let loading = false;
    let searched = false;
    let search_id = 0;
    let search_term = "";
    let show = 5;
    let initial_filters = null;
    let available_filters = null;
    let selected_filters = {};
    const init2 = async () => {
      if (initializing)
        return;
      $$invalidate(3, initializing = true);
      if (!pagefind) {
        pagefind = await import(`${base_path}pagefind.js`);
        pagefind.options(pagefind_options || {});
        loadFilters();
      }
    };
    const loadFilters = async () => {
      if (pagefind) {
        initial_filters = await pagefind.filters();
        if (!available_filters || !Object.keys(available_filters).length) {
          $$invalidate(9, available_filters = initial_filters);
        }
      }
    };
    const parseSelectedFilters = (filters) => {
      let filter = {};
      Object.entries(filters).filter(([, selected]) => selected).forEach(([selection]) => {
        let [key, value] = selection.split(/:(.*)$/);
        filter[key] = filter[key] || [];
        filter[key].push(value);
      });
      return filter;
    };
    const search = async (term, raw_filters) => {
      const filters = parseSelectedFilters(raw_filters);
      if (!term && !Object.keys(filters).length) {
        $$invalidate(6, searched = false);
        $$invalidate(9, available_filters = initial_filters);
        return;
      }
      $$invalidate(7, search_term = term || "");
      $$invalidate(5, loading = true);
      $$invalidate(6, searched = true);
      while (!pagefind) {
        init2();
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
      const local_search_id = ++search_id;
      const results = await pagefind.search(term, { filters });
      if (search_id === local_search_id) {
        if (results.filters && Object.keys(results.filters)?.length) {
          $$invalidate(9, available_filters = results.filters);
        }
        $$invalidate(4, searchResult = results);
        $$invalidate(5, loading = false);
        $$invalidate(8, show = 5);
      }
    };
    const showMore = () => {
      $$invalidate(8, show += 5);
    };
    function input_input_handler() {
      val = this.value;
      $$invalidate(1, val);
    }
    function filters_selected_filters_binding(value) {
      selected_filters = value;
      $$invalidate(2, selected_filters);
    }
    $$self.$$set = ($$props2) => {
      if ("base_path" in $$props2)
        $$invalidate(12, base_path = $$props2.base_path);
      if ("reset_styles" in $$props2)
        $$invalidate(0, reset_styles = $$props2.reset_styles);
      if ("pagefind_options" in $$props2)
        $$invalidate(13, pagefind_options = $$props2.pagefind_options);
    };
    $$self.$$.update = () => {
      if ($$self.$$.dirty & 6) {
        $:
          search(val, selected_filters);
      }
    };
    return [
      reset_styles,
      val,
      selected_filters,
      initializing,
      searchResult,
      loading,
      searched,
      search_term,
      show,
      available_filters,
      init2,
      showMore,
      base_path,
      pagefind_options,
      input_input_handler,
      filters_selected_filters_binding
    ];
  }
  var Ui = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance3, create_fragment3, safe_not_equal, {
        base_path: 12,
        reset_styles: 0,
        pagefind_options: 13
      });
    }
  };
  var ui_default = Ui;

  // ui.js
  var scriptBundlePath;
  try {
    scriptBundlePath = new URL(document.currentScript.src).pathname.match(/^(.*\/)(?:pagefind-)?ui.js.*$/)[1];
  } catch (e) {
    scriptBundlePath = "/_pagefind/";
    console.warn(`Pagefind couldn't determine the base of the bundle from the javascript import path. Falling back to the default of ${bundlePath}.`);
    console.warn("You can configure this by passing a bundlePath option to PagefindUI");
    console.warn(`[DEBUG: Loaded from ${document?.currentScript?.src ?? "unknown"}]`);
  }
  var PagefindUI = class {
    constructor(opts) {
      let selector = opts.element ?? "[data-pagefind-ui]";
      let bundlePath2 = opts.bundlePath ?? scriptBundlePath;
      let resetStyles = opts.resetStyles ?? true;
      delete opts["element"];
      delete opts["bundlePath"];
      delete opts["resetStyles"];
      const dom = document.querySelector(selector);
      if (dom) {
        new ui_default({
          target: dom,
          props: {
            base_path: bundlePath2,
            reset_styles: resetStyles,
            pagefind_options: opts
          }
        });
      } else {
        console.error(`Pagefind UI couldn't find the selector ${selector}`);
      }
    }
  };
  window.PagefindUI = PagefindUI;
})();
