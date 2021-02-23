module.exports = class Command {
    constructor(info) {
        this.name = info.name;
        this.category = info.category;
        this.description = info.description || "Aucune description";
        this.usage = info.usage || [info.name];
        this.example = info.example || [];
        this.aliases = info.aliases || [];
        this.perms = info.perms || 'everyone';
        this.botperms = info.botperms || [];
        this.botNotAllowed = info.botNotAllowed || false;
    }
};
