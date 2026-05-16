---
title: How to use prettier with Emacs js2-mode
date: 2018-01-04 16:35:40
tags: ["emacs", "javascript"]
---



``` emacs-lisp
(require 'nvm)

(defun do-nvm-use (version)
  (interactive "sVersion: ")
  (nvm-use version)
  ;; exec-path-from-shell made a new login shell at startup and imported values,
  ;; including PATH to exec-path. But nvm-use does setenv "PATH". So we need to
  ;; update exec-path to the current PATH in the Emacs process.
  (exec-path-from-shell-copy-env "PATH"))

(defun my/use-prettier-if-in-node-modules ()
  "Use prettier-js-mode if prettier is found in this file's
project's node_modules. Use the prettier binary from this
project."
  (let* ((root (locate-dominating-file
                (or (buffer-file-name) default-directory)
                "node_modules"))
         (prettier (and root
                      (expand-file-name "node_modules/prettier/bin/prettier.js"
                                        root))))
    (when (and prettier (file-executable-p prettier))
      (setq prettier-js-command prettier)
      (prettier-js-mode))))

(when (require 'prettier-js nil t)
  (make-variable-buffer-local 'prettier-js-command)
  (add-hook 'js2-mode-hook #'my/use-prettier-if-in-node-modules))
```
