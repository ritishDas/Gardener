
import { gardener, fetchElement, replaceElement } from '../gardener.js'

export default function thisfun() {
  return gardener({
  "t": "body",
  "cn": [
    "bg-slate-50",
    "text-slate-900",
    "antialiased"
  ],
  "children": [
    {
      "t": "div",
      "cn": [
        "max-w-7xl",
        "mx-auto",
        "px-6",
        "py-12",
        "space-y-20"
      ],
      "children": [
        {
          "t": "section",
          "cn": [
            "bg-gradient-to-br",
            "from-emerald-50",
            "to-cyan-50",
            "rounded-3xl",
            "p-10",
            "lg:p-16",
            "shadow-xl"
          ],
          "children": [
            {
              "t": "div",
              "cn": [
                "flex",
                "flex-col",
                "lg:flex-row",
                "items-center",
                "justify-between",
                "gap-12"
              ],
              "children": [
                {
                  "t": "div",
                  "cn": [
                    "max-w-2xl",
                    "space-y-6"
                  ],
                  "children": [
                    {
                      "t": "h1",
                      "cn": [
                        "text-4xl",
                        "lg:text-5xl",
                        "font-bold",
                        "text-slate-800"
                      ],
                      "txt": "Gardener"
                    },
                    {
                      "t": "p",
                      "cn": [
                        "text-xl",
                        "text-slate-700",
                        "leading-relaxed"
                      ],
                      "txt": "Gardener is a lightweight front-end library for creating and manipulating DOM elements using a clean, declarative JavaScript object syntax."
                    },
                    {
                      "t": "p",
                      "cn": [
                        "text-lg",
                        "text-slate-600",
                        "leading-relaxed"
                      ],
                      "txt": "It comes with a development server featuring hot reload, on-the-fly component creation from existing HTML, dynamic image resizing & caching, and zero virtual DOM / JSX / build-step philosophy."
                    }
                  ]
                },
                {
                  "t": "img",
                  "cn": [
                    "w-64",
                    "lg:w-80",
                    "rounded-2xl",
                    "shadow-2xl"
                  ],
                  "attr": {
                    "src": "/cache/gardener_500x500.webp",
                    "alt": "Gardener logo"
                  }
                }
              ]
            }
          ]
        },
        {
          "t": "section",
          "cn": [
            "bg-linear-to-br",
            "from-slate-900",
            "to-slate-800",
            "rounded-3xl",
            "p-10",
            "lg:p-12",
            "shadow-2xl",
            "space-y-6"
          ],
          "children": [
            {
              "t": "h2",
              "cn": [
                "text-3xl",
                "font-bold"
              ],
              "txt": "Design Philosophy"
            },
            {
              "t": "ul",
              "cn": [
                "list-disc",
                "list-inside",
                "space-y-3",
                "text-lg"
              ],
              "children": [
                {
                  "t": "li",
                  "txt": "No virtual DOM"
                },
                {
                  "t": "li",
                  "txt": "No JSX"
                },
                {
                  "t": "li",
                  "txt": "No compilation / build step"
                },
                {
                  "t": "li",
                  "txt": "DOM-first and fully deterministic"
                },
                {
                  "t": "li",
                  "txt": "Everything is explicit and inspectable in the browser"
                }
              ]
            }
          ]
        },
        {
          "t": "section",
          "cn": [
            "space-y-10"
          ],
          "children": [
            {
              "t": "h2",
              "cn": [
                "text-3xl",
                "font-bold",
                "text-center",
                "lg:text-left"
              ],
              "txt": "Core Utilities"
            },
            {
              "t": "div",
              "cn": [
                "grid",
                "md:grid-cols-2",
                "gap-8"
              ],
              "children": [
                {
                  "t": "div",
                  "cn": [
                    "bg-white",
                    "p-8",
                    "rounded-2xl",
                    "shadow",
                    "space-y-4"
                  ],
                  "children": [
                    {
                      "t": "h3",
                      "cn": [
                        "text-2xl",
                        "font-semibold"
                      ],
                      "txt": "DOM Helpers"
                    },
                    {
                      "t": "ul",
                      "cn": [
                        "list-disc",
                        "list-inside",
                        "space-y-2",
                        "text-slate-700"
                      ],
                      "children": [
                        {
                          "t": "li",
                          "children": [
                            {
                              "t": "code",
                              "cn": [
                                "font-mono"
                              ],
                              "txt": "fetchElement(selector)"
                            },
                            {
                              "t": "code",
                              "txt": "querySelector"
                            }
                          ]
                        },
                        {
                          "t": "li",
                          "children": [
                            {
                              "t": "code",
                              "txt": "appendElement(parent, child)"
                            }
                          ]
                        },
                        {
                          "t": "li",
                          "children": [
                            {
                              "t": "code",
                              "txt": "replaceElement(oldElement, newElement)"
                            }
                          ]
                        },
                        {
                          "t": "li",
                          "children": [
                            {
                              "t": "code",
                              "txt": "createElement(type, classes)"
                            }
                          ]
                        },
                        {
                          "t": "li",
                          "children": [
                            {
                              "t": "code",
                              "txt": "imagePreloader(images)"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "t": "div",
                  "cn": [
                    "bg-white",
                    "p-8",
                    "rounded-2xl",
                    "shadow",
                    "space-y-4"
                  ],
                  "children": [
                    {
                      "t": "h3",
                      "cn": [
                        "text-2xl",
                        "font-semibold"
                      ],
                      "txt": "Gardener – The Declarative Builder"
                    },
                    {
                      "t": "pre",
                      "cn": [
                        "bg-slate-900",
                        "text-slate-100",
                        "text-sm",
                        "p-5",
                        "rounded-xl",
                        "overflow-x-auto",
                        "font-mono"
                      ],
                      "children": [
                        {
                          "t": "code",
                          "txt": "gardener({\n  t: 'div',\n  cn: ['p-6', 'flex', 'gap-4'],\n  attr: { id: 'hero', role: 'banner' },\n  txt: 'Welcome',\n  events: {\n    click: () => console.log('clicked!')\n  },\n  children: [ /* nested objects */ ]\n})"
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "t": "div",
              "cn": [
                "bg-white",
                "p-8",
                "rounded-2xl",
                "shadow",
                "overflow-x-auto"
              ],
              "children": [
                {
                  "t": "table",
                  "cn": [
                    "w-full",
                    "text-left",
                    "border",
                    "border-slate-200"
                  ],
                  "children": [
                    {
                      "t": "thead",
                      "cn": [
                        "bg-slate-100"
                      ],
                      "children": [
                        {
                          "t": "tr",
                          "children": [
                            {
                              "t": "th",
                              "cn": [
                                "p-4",
                                "font-semibold"
                              ],
                              "txt": "Key"
                            },
                            {
                              "t": "th",
                              "cn": [
                                "p-4",
                                "font-semibold"
                              ],
                              "txt": "Description"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "t": "tbody",
                      "cn": [
                        "text-slate-700"
                      ],
                      "children": [
                        {
                          "t": "tr",
                          "children": [
                            {
                              "t": "td",
                              "cn": [
                                "p-4",
                                "border-t"
                              ],
                              "children": [
                                {
                                  "t": "code",
                                  "txt": "t"
                                }
                              ]
                            },
                            {
                              "t": "td",
                              "cn": [
                                "p-4",
                                "border-t"
                              ],
                              "txt": "HTML/SVG tag name"
                            }
                          ]
                        },
                        {
                          "t": "tr",
                          "children": [
                            {
                              "t": "td",
                              "cn": [
                                "p-4",
                                "border-t"
                              ],
                              "children": [
                                {
                                  "t": "code",
                                  "txt": "cn"
                                }
                              ]
                            },
                            {
                              "t": "td",
                              "cn": [
                                "p-4",
                                "border-t"
                              ],
                              "txt": "Array of class names"
                            }
                          ]
                        },
                        {
                          "t": "tr",
                          "children": [
                            {
                              "t": "td",
                              "cn": [
                                "p-4",
                                "border-t"
                              ],
                              "children": [
                                {
                                  "t": "code",
                                  "txt": "attr"
                                }
                              ]
                            },
                            {
                              "t": "td",
                              "cn": [
                                "p-4",
                                "border-t"
                              ],
                              "txt": "Attributes / properties object"
                            }
                          ]
                        },
                        {
                          "t": "tr",
                          "children": [
                            {
                              "t": "td",
                              "cn": [
                                "p-4",
                                "border-t"
                              ],
                              "children": [
                                {
                                  "t": "code",
                                  "txt": "txt"
                                }
                              ]
                            },
                            {
                              "t": "td",
                              "cn": [
                                "p-4",
                                "border-t"
                              ],
                              "txt": "Text content (string)"
                            }
                          ]
                        },
                        {
                          "t": "tr",
                          "children": [
                            {
                              "t": "td",
                              "cn": [
                                "p-4",
                                "border-t"
                              ],
                              "children": [
                                {
                                  "t": "code",
                                  "txt": "events"
                                }
                              ]
                            },
                            {
                              "t": "td",
                              "cn": [
                                "p-4",
                                "border-t"
                              ],
                              "children": [
                                {
                                  "t": "code",
                                  "txt": "{ event: handler }"
                                }
                              ]
                            }
                          ]
                        },
                        {
                          "t": "tr",
                          "children": [
                            {
                              "t": "td",
                              "cn": [
                                "p-4",
                                "border-t"
                              ],
                              "children": [
                                {
                                  "t": "code",
                                  "txt": "children"
                                }
                              ]
                            },
                            {
                              "t": "td",
                              "cn": [
                                "p-4",
                                "border-t"
                              ],
                              "txt": "Array of nested gardener objects"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "t": "section",
          "cn": [
            "bg-white",
            "p-10",
            "rounded-2xl",
            "shadow",
            "space-y-6"
          ],
          "children": [
            {
              "t": "h2",
              "cn": [
                "text-3xl",
                "font-bold"
              ],
              "txt": "Runtime Configuration"
            },
            {
              "t": "pre",
              "cn": [
                "bg-slate-900",
                "text-slate-100",
                "p-6",
                "rounded-xl",
                "overflow-x-auto",
                "font-mono",
                "text-sm"
              ],
              "children": [
                {
                  "t": "code",
                  "txt": "const config = {\n  mode: 'dev',           // 'dev' | 'prod'\n  componentdir: 'components',\n  hotreload: true\n}"
                }
              ]
            },
            {
              "t": "ul",
              "cn": [
                "list-disc",
                "list-inside",
                "space-y-3",
                "text-slate-700"
              ],
              "children": [
                {
                  "t": "li",
                  "children": [
                    {
                      "t": "strong",
                      "txt": "mode"
                    },
                    {
                      "t": "code",
                      "txt": "dev"
                    },
                    {
                      "t": "code",
                      "txt": "prod"
                    }
                  ]
                },
                {
                  "t": "li",
                  "children": [
                    {
                      "t": "strong",
                      "txt": "componentdir"
                    }
                  ]
                },
                {
                  "t": "li",
                  "children": [
                    {
                      "t": "strong",
                      "txt": "hotreload"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "t": "section",
          "cn": [
            "bg-white",
            "p-10",
            "rounded-2xl",
            "shadow",
            "space-y-6"
          ],
          "children": [
            {
              "t": "h2",
              "cn": [
                "text-3xl",
                "font-bold"
              ],
              "txt": "Hot Reload (Dev Mode)"
            },
            {
              "t": "ul",
              "cn": [
                "list-disc",
                "list-inside",
                "space-y-3",
                "text-slate-700"
              ],
              "children": [
                {
                  "t": "li",
                  "children": [
                    {
                      "t": "code",
                      "txt": "localStorage"
                    }
                  ]
                },
                {
                  "t": "li",
                  "txt": "Auto-reload after ~1 second when enabled"
                },
                {
                  "t": "li",
                  "txt": "Disabling cancels pending timers"
                }
              ]
            },
            {
              "t": "div",
              "cn": [
                "inline-block",
                "bg-slate-100",
                "px-5",
                "py-3",
                "rounded-xl",
                "mt-4"
              ],
              "children": [
                {
                  "t": "p",
                  "cn": [
                    "font-semibold"
                  ],
                  "children": [
                    {
                      "t": "kbd",
                      "cn": [
                        "bg-white",
                        "px-2",
                        "py-1",
                        "rounded",
                        "border",
                        "border-slate-300"
                      ],
                      "txt": "Ctrl + H"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "t": "section",
          "cn": [
            "bg-white",
            "p-10",
            "rounded-2xl",
            "shadow",
            "space-y-6"
          ],
          "children": [
            {
              "t": "h2",
              "cn": [
                "text-3xl",
                "font-bold"
              ],
              "txt": "SVG Support"
            },
            {
              "t": "p",
              "cn": [
                "text-slate-700"
              ],
              "txt": "Gardener automatically uses the SVG namespace for these tags:"
            },
            {
              "t": "pre",
              "cn": [
                "bg-slate-900",
                "text-emerald-300",
                "font-mono",
                "p-5",
                "rounded-xl",
                "inline-block"
              ],
              "children": [
                {
                  "t": "code",
                  "txt": "svg, path, circle, rect, line, polygon, polyline, g, defs, clipPath, use"
                }
              ]
            },
            {
              "t": "p",
              "cn": [
                "text-slate-700"
              ],
              "children": [
                {
                  "t": "code",
                  "txt": "setAttribute"
                }
              ]
            }
          ]
        },
        {
          "t": "section",
          "cn": [
            "grid",
            "lg:grid-cols-2",
            "gap-10"
          ],
          "children": [
            {
              "t": "div",
              "cn": [
                "bg-white",
                "p-10",
                "rounded-2xl",
                "shadow",
                "space-y-6"
              ],
              "children": [
                {
                  "t": "h2",
                  "cn": [
                    "text-3xl",
                    "font-bold"
                  ],
                  "txt": "Creating Components"
                },
                {
                  "t": "ol",
                  "cn": [
                    "list-decimal",
                    "list-inside",
                    "space-y-4",
                    "text-slate-700"
                  ],
                  "children": [
                    {
                      "t": "li",
                      "children": [
                        {
                          "t": "code",
                          "txt": "id"
                        }
                      ]
                    },
                    {
                      "t": "li",
                      "children": [
                        {
                          "t": "code",
                          "txt": "parser(fetchElement('#your-id'))"
                        }
                      ]
                    },
                    {
                      "t": "li",
                      "txt": "Popup appears → choose component name"
                    },
                    {
                      "t": "li",
                      "children": [
                        {
                          "t": "code",
                          "txt": "/src/frontend/components/YourName.js"
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "t": "div",
              "cn": [
                "bg-white",
                "p-10",
                "rounded-2xl",
                "shadow",
                "space-y-6"
              ],
              "children": [
                {
                  "t": "h2",
                  "cn": [
                    "text-3xl",
                    "font-bold"
                  ],
                  "txt": "Using Components"
                },
                {
                  "t": "pre",
                  "cn": [
                    "bg-slate-900",
                    "text-slate-100",
                    "p-6",
                    "rounded-xl",
                    "font-mono",
                    "text-sm",
                    "overflow-x-auto"
                  ],
                  "children": [
                    {
                      "t": "code",
                      "txt": "import { myHeader } from '/components/myHeader.js'\n\nreplaceElement(\n  fetchElement('#header-placeholder'),\n  myHeader()\n)"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "t": "section",
          "cn": [
            "bg-white",
            "p-10",
            "rounded-2xl",
            "shadow",
            "space-y-6"
          ],
          "children": [
            {
              "t": "h2",
              "cn": [
                "text-3xl",
                "font-bold"
              ],
              "txt": "Image Optimization & Caching"
            },
            {
              "t": "ul",
              "cn": [
                "list-disc",
                "list-inside",
                "space-y-3",
                "text-slate-700"
              ],
              "children": [
                {
                  "t": "li",
                  "children": [
                    {
                      "t": "code",
                      "txt": "/src/frontend/assets/"
                    }
                  ]
                },
                {
                  "t": "li",
                  "children": [
                    {
                      "t": "code",
                      "txt": "<img src=\"/cache/photo_800x600.webp\">"
                    }
                  ]
                }
              ]
            },
            {
              "t": "p",
              "cn": [
                "text-slate-600",
                "mt-4"
              ],
              "txt": "Server auto-converts to WebP, resizes, and caches on demand."
            }
          ]
        },
        {
          "t": "section",
          "cn": [
            "space-y-10"
          ],
          "children": [
            {
              "t": "h2",
              "cn": [
                "text-3xl",
                "font-bold",
                "text-center"
              ],
              "txt": "Development Tools"
            },
            {
              "t": "div",
              "cn": [
                "grid",
                "md:grid-cols-2",
                "gap-8"
              ],
              "children": [
                {
                  "t": "div",
                  "cn": [
                    "bg-white",
                    "p-8",
                    "rounded-2xl",
                    "shadow",
                    "space-y-4"
                  ],
                  "children": [
                    {
                      "t": "h3",
                      "cn": [
                        "text-2xl",
                        "font-semibold"
                      ],
                      "txt": "Create New Page"
                    },
                    {
                      "t": "ol",
                      "cn": [
                        "list-decimal",
                        "list-inside",
                        "space-y-2",
                        "text-slate-700"
                      ],
                      "children": [
                        {
                          "t": "li",
                          "children": [
                            {
                              "t": "strong",
                              "txt": "+"
                            }
                          ]
                        },
                        {
                          "t": "li",
                          "children": [
                            {
                              "t": "code",
                              "txt": "/about"
                            }
                          ]
                        },
                        {
                          "t": "li",
                          "txt": "New page created & browser navigates"
                        }
                      ]
                    },
                    {
                      "t": "p",
                      "cn": [
                        "text-sm",
                        "text-slate-500",
                        "mt-4"
                      ],
                      "children": [
                        {
                          "t": "code",
                          "txt": "/src/backend/frontendtemplate.ejs"
                        }
                      ]
                    }
                  ]
                },
                {
                  "t": "div",
                  "cn": [
                    "bg-white",
                    "p-8",
                    "rounded-2xl",
                    "shadow",
                    "space-y-4"
                  ],
                  "children": [
                    {
                      "t": "h3",
                      "cn": [
                        "text-2xl",
                        "font-semibold"
                      ],
                      "txt": "Generate Static Site"
                    },
                    {
                      "t": "span",
                      "txt": "jj"
                    },
                    {
                      "t": "p",
                      "cn": [
                        "text-slate-700"
                      ],
                      "children": [
                        {
                          "t": "code",
                          "txt": "/createstatic"
                        },
                        {
                          "t": "code",
                          "txt": "/src/frontendStatic"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "t": "script",
      "attr": {
        "src": "/global.js",
        "type": "module"
      }
    },
    {
      "t": "script",
      "attr": {
        "type": "module"
      },
      "txt": "import { parser, fetchElement } from \"/gardener.js\";\n     parser(fetchElement(\"body\")); // uncomment when needed"
    },
    {
      "t": "button",
      "cn": [
        "pb-1.5",
        "flex",
        "items-center",
        "justify-center",
        "h-15",
        "w-15",
        "bg-green-300",
        "fixed",
        "bottom-22",
        "right-2",
        "rounded-full",
        "text-5xl"
      ],
      "children": [
        {
          "t": "span",
          "txt": "+"
        }
      ]
    },
    {
      "t": "p",
      "cn": [
        "bg-gray-200",
        "fixed",
        "bottom-0",
        "z-100",
        "right-0",
        "border-b-1",
        "p-2",
        "rounded-md"
      ],
      "children": [
        {
          "t": "span",
          "txt": "Press"
        },
        {
          "t": "span",
          "cn": [
            "text-green-500",
            "font-bold"
          ],
          "txt": "Ctrl+h"
        },
        {
          "t": "span",
          "txt": "to toggle Hot Reload"
        },
        {
          "t": "form",
          "cn": [
            "p-2",
            "bg-red-300"
          ],
          "attr": {
            "id": "hrcheckbox",
            "style": "background: red;"
          },
          "children": [
            {
              "t": "label",
              "txt": "Hot Reload"
            },
            {
              "t": "input",
              "cn": [
                "hrcheckbox"
              ],
              "attr": {
                "type": "checkbox"
              }
            }
          ]
        }
      ]
    }
  ]
})
}
