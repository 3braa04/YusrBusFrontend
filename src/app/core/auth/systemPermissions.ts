export class SystemPermissions {
  static Format(resource: string, action: string): string {
    return `${resource}:${action}`;
  }
  static hasAuth(permissions: string[], resource: string, action: string) {
    const formattedPermissions = this.Format(resource, action);
    return permissions.includes(formattedPermissions);
  }
}
