"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"

export type Users = {
  id_users: string
  password_users: number
  name_users: string
  email_users: string
  created_at_users: string
}

export const columns: ColumnDef<Users>[] = [
  {
    accessorKey: "id_users",
    header: "ID",
  },
  {
    accessorKey: "password_users",
    header: "Password",
  },
  {
    accessorKey: "name_users",
    header: "Name",
  },
  {
    accessorKey: "email_users",
    header: "Email",
  },
  {
    accessorKey: "created_at_users",
    header: "Created At",
  },
  {
    id: "actions",
    header: "Actions",

    cell: ({ row }) => {
      const id = row.original.id_users
      return (
          <div className="flex justify-between">
            <Button className="mr-2" variant="secondary">Editar</Button>
            <Button variant="destructive">Excluir</Button>
          </div>
      )
    }
  }
]
