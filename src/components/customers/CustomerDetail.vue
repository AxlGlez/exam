<template>
  <div class="columns is-multiline">
    <div class="column is-12">
      <div class="columns is-multiline tile is-ancestor">
        <div class="column is-3 tile">
          <div class="tile is-child box">
            <div class="columns is-multiline">
              <div class="column is-12">
                <figure class="image container is-128x128">
                  <img
                    class="is-rounded"
                    :src="detail.profile_picture || require(`@/assets/default-profile.png`)"
                    alt="imagen de perfil"
                  >
                </figure>
              </div>
              <div class="column is-6">
                <b>Estatus</b>
                <p>
                  {{ detail.active ? 'Activo' : 'Inactivo' }}
                </p>
              </div>
              <div class="column is-6">
                <b>E-mail</b>
                <p>
                  {{ detail.verified_email ? 'Verificado' : 'No verificado' }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-9 tile is-parent">
          <div class="box">
            <div class="columns is-multiline">
              <div class="column is-12">
                <h2 class="subtitle has-text-centered">
                  Usuario
                </h2>
              </div>
              <div class="column is-4">
                <b>Nombre</b>
                <p>
                  {{ detail.name }}
                </p>
              </div>
              <div class="column is-4">
                <b>Apellido Paterno:</b>
                <p>
                  {{ detail.last_name }}
                </p>
              </div>
              <div class="column is-4">
                <b>Apellido Materno:</b>
                <p>
                  {{ detail.second_last_name }}
                </p>
              </div>
              <div class="column is-4">
                <b>Nombre de Usuario:</b>
                <p>
                  {{ detail.username }}
                </p>
              </div>
              <div class="column is-4">
                <b>E-mail:</b>
                <p>
                  {{ detail.email }}
                </p>
              </div>
              <div class="column is-4">
                <b>Teléfono:</b>
                <p>
                  {{ detail.phone || 'Sin información' }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="column is-6">
      <div class="box">
        <div class="columns is-multiline">
          <div class="column is-12">
            <h2 class="subtitle has-text-centered">
              Dirección
            </h2>
          </div>
          <div class="column is-4">
            <b>País:</b>
            <p>
              {{ detail.countryName || 'Sin información' }}
            </p>
          </div>
          <div class="column is-4">
            <b>Estado:</b>
            <p>
              {{ detail.state || 'Sin información' }}
            </p>
          </div>
          <div class="column is-4">
            <b>Municipio / Delegación:</b>
            <p>
              {{ detail.commune || 'Sin información' }}
            </p>
          </div>
          <div class="column is-4">
            <b>Colonia:</b>
            <p>
              {{ detail.suburb || 'Sin información' }}
            </p>
          </div>
          <div class="column is-4">
            <b>Código Postal:</b>
            <p>
              {{ detail.zip_code || 'Sin información' }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="column is-6">
      <div class="box">
        <div class="columns is-multiline">
          <div class="column is-12">
            <h2 class="subtitle has-text-centered">
              Profesión
            </h2>
          </div>
          <div class="column is-4">
            <b>Perfil Profesional:</b>
            <p>
              {{ detail.professional_profile_name || 'Sin información' }}
            </p>
          </div>
          <div class="column is-4">
            <b>Sector:</b>
            <p>
              {{ detail.laboral_sector_name || 'Sin información' }}
            </p>
          </div>
          <div class="column is-4">
            <b>Cargo Actual:</b>
            <p>
              {{ detail.job_occupation || 'Sin información' }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserDetail',
  props: {
    detail: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
</style>
