Vagrant.configure("2") do |config|
  config.vm.box = "base"

  config.push.define "ftp" do |push|
    push.host = "thewebb.blog"
    push.username = "root"
    push.password = "~/.ssh/id_rsa"
    push.secure = true
    push.destination = "/var/www/twb"
    push.exclude = ".DS_Store"
    push.exclude = ".git"
    push.exclude = ".sass-cache"
    push.exclude = "node_modules"
    push.exclude = "Vagrantfile"
  end
end
