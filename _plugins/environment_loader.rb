# Jekyll Plugin: Environment Variables Loader
# This plugin loads environment variables and makes them available in Jekyll

Jekyll::Hooks.register :site, :after_init do |site|
  # Load environment variables from .env.local if it exists
  env_file = File.join(site.source, '.env.local')
  
  if File.exist?(env_file)
    File.readlines(env_file).each do |line|
      line.strip!
      next if line.empty? || line.start_with?('#')
      
      key, value = line.split('=', 2)
      next unless key && value
      
      ENV[key.strip] = value.strip
    end
  end
  
  # Map environment variables to site config
  env_mappings = {
    'FORMSPREE_ENDPOINT' => 'formspree_endpoint',
    'SITE_EMAIL' => 'email',
    'DEBUG_MODE' => 'debug_mode'
  }
  
  env_mappings.each do |env_key, config_key|
    env_value = ENV[env_key]
    if env_value && !env_value.empty?
      # Convert string booleans to actual booleans
      if env_value.downcase == 'true'
        site.config[config_key] = true
      elsif env_value.downcase == 'false'
        site.config[config_key] = false
      else
        site.config[config_key] = env_value
      end
      
      puts "✓ Loaded #{config_key}: #{env_value}" if site.config['debug_mode']
    end
  end
end
