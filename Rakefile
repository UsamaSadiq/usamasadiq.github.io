#!/usr/bin/env ruby
# frozen_string_literal: true

require "html-proofer"

desc "Test the site with HTMLProofer"
task :test_html do
  options = {
    disable_external: true,
    ignore_empty_alt: true,
    allow_missing_href: true,
    ignore_urls: [
      /^http:\/\/127\.0\.0\.1/,
      /^http:\/\/0\.0\.0\.0/,
      /^http:\/\/localhost/,
      /\/categories\/$/,
      /\/tags\/$/,
      /^$/
    ]
  }
  
  HTMLProofer.check_directory("./_site", options).run
end

desc "Build and test the site"
task :test do
  sh "bundle exec jekyll build"
  Rake::Task["test_html"].invoke
end

desc "Build the site"
task :build do
  sh "bundle exec jekyll build"
end

task default: :test