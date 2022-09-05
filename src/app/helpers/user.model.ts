export class Roles {
    superAdmin?:  boolean;
    admin?:       boolean;
    finance?:     boolean;
    editor?:      boolean;
    user?:        boolean;
  
    constructor(){
      this.superAdmin = false;
      this.admin = false;
      this.finance = false;
      this.editor = false;
      this.user = true;
    }
  }
  
  export interface Status {
    active?:    boolean;
    inactive?:  boolean;
    pending?:   boolean;
  }
  
  export interface UserModel {
    uid?:         string;
    firstName?:   string;
    lastName?:    string;
    phoneNumber?: string;
    domains?:     string;
    email?:       string;
    avatar?:      string;
    status?:      Status;
    roles?:        Roles ;
  }
  
  export class RolesManagement {
  
    constructor(private roles: Roles = {
      superAdmin:  true,
      admin:       true,
      finance:     true,
      editor:      true,
      user:        true
    }){}
  
    public rolesIndexation() {
      return this.roles;
    }
  }