module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ["prismjs", {
      languages: [
        "javascript", "css", "markup", "java", "html", "basic", "bash", "c", "csharp", "cpp", "cmake", "ejs", "erlang", "git", "go", "java", "json", "julia", "lisp", "lua", "matlab", "mongodb", "nginx", "php", "perl", "powershell", "python", "racket", "ruby", "rust", "sql", "swift", "twig", "vbnet", "verilog", "vim", "yaml"
      ],
      plugins: [
        "line-numbers", "highlight-keywords"
      ],
      theme: "dark"
    }]
  ]
}
